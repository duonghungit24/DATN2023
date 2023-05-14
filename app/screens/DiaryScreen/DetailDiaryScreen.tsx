import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  ImageStyle,
  Platform,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../../navigators"
import {
  Button,
  Header,
  ModalConfirmDelete,
  Screen,
  SelectImage,
  Text,
  TextField,
} from "../../components"
import { colors, typography } from "../../theme"
import { configs } from "../../utils/configs"
import { useStores } from "../../models"
import { ActionSheetCustom as ActionSheet } from "@alessiocancian/react-native-actionsheet"
import { RighAcessory, options } from "../TodoScreen/DetailTodoScreen"
import uuid from "react-native-uuid"
import ImageView from "react-native-image-viewing"
import ImagePicker from "react-native-image-crop-picker"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { translate } from "../../i18n"
import { utils } from "../../utils"
import { ImageConstant, listEmoji } from "../../theme/image"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `DetailDiary: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="DetailDiary" component={DetailDiaryScreen} />`
// Hint: Look for the 🔥!
const $colorText: TextStyle = { color: "#35ABFF", fontSize: 16 }
export const optionsImg = [
  <Text preset="semibold" style={$colorText} tx="boqua" />,
  <Text preset="regular" style={$colorText} tx="chontuthuvien" />,
  <Text preset="regular" style={$colorText} tx="chupanh" />,
]
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DetailDiaryScreen: FC<StackScreenProps<AppStackScreenProps, "DetailDiary">> = observer(
  function DetailDiaryScreen({ route }) {
    // Pull in one of our MST stores
    const { diaryStore, languageStore } = useStores()
    const key = route.params?.key

    const refAction = useRef(null)
    const refImg = useRef(null)
    const [itemDetail, setItemDetail] = useState<any>({})
    const [listImages, setListImage] = useState([])
    const [indexImg, setIndexImg] = useState(0)

    const [isVisible, setIsvisible] = useState(false)
    const [edit, setEdit] = useState(false)
    const [isVisibleDate, setIsvisibleDate] = useState(false)
    const [isVisibleImg, setIsvisibleImg] = useState(false)

    useEffect(() => {
      setItemDetail(route.params.itemDetail)
      setListImage(route.params.itemDetail?.images)
    }, [])

    const onPressAction = (index) => {
      switch (index) {
        case 1:
          setEdit(true)
          break
        case 2:
          setIsvisible(true)
        default:
          break
      }
    }

    const onPressActionImg = (index) => {
      if (index == 1) {
        setTimeout(() => {
          ImagePicker.openPicker({
            multiple: true,
          }).then((images) => {
            const result = images.map((el) => {
              console.log("el", el)
              return {
                id: uuid.v4(),
                uri: Platform.OS == "ios" ? el.sourceURL : el.path,
              }
            })
            setListImage([...listImages, ...result])
          })
        }, 300)
      } else if (index == 2) {
        setTimeout(() => {
          ImagePicker.openCamera({
            mediaType: "photo",
          }).then((image) => {
            const obj = {
              id: uuid.v4(),
              uri: Platform.OS == "ios" ? image.sourceURL : image.path,
            }
            const dt = []
            dt.push(obj)
            setListImage([...listImages, ...dt])
          })
        }, 300)
      }
    }

    const viewImage = (index) => {
      setIsvisibleImg(true)
      setIndexImg(index)
    }

    const onPressRemoveImg = (value) => {
      const dt = listImages.filter((el) => el.id != value.id)
      setListImage(dt)
    }

    const DisplayImage = useMemo(() => {
      return (
        <SelectImage
          dataImages={listImages}
          onPressAdd={() => refImg.current.show()}
          onPressView={(index) => viewImage(index)}
          onPressRemove={(value) => onPressRemoveImg(value)}
          edit={edit}
        />
      )
    }, [listImages, edit])

    const onConfirmDate = (value) => {
      setItemDetail({
        ...itemDetail,
        time: value.toString(),
      })
      setIsvisibleDate(false)
    }

    const onUpdate = () => {
      const params = {
        ...itemDetail,
        images: listImages,
      }
      diaryStore.updateDiary(utils.displayDateCalendar(key), params)
      goBack()
    }

    const onPressRemoveItem = () => {
      diaryStore.removeDiary(utils.displayDateCalendar(itemDetail.time), itemDetail)
      goBack()
    }

    return (
      <Screen style={$root} preset="fixed">
        <Header
          typeIconLeft="AntDesign"
          leftIcon="arrowleft"
          typeIconRight="Entypo"
          rightIcon="dots-three-horizontal"
          backgroundColor={colors.neutral000}
          titleTx="thongtinchitiet"
          onRightPress={() => refAction.current.show()}
        />
        <ModalConfirmDelete
          isVisible={isVisible}
          onBackDropPress={() => setIsvisible(false)}
          onPressRemove={onPressRemoveItem}
        />
        <ActionSheet
          ref={refAction}
          options={options}
          cancelButtonIndex={0}
          onPress={onPressAction}
          theme="ios"
          styles={configs.actionStyle}
        />
        <ActionSheet
          ref={refImg}
          options={optionsImg}
          cancelButtonIndex={0}
          onPress={onPressActionImg}
          theme="ios"
          styles={configs.actionStyle}
        />
        <ImageView
          images={listImages}
          imageIndex={indexImg}
          visible={isVisibleImg}
          onRequestClose={() => setIsvisibleImg(false)}
        />
        <DateTimePickerModal
          date={new Date(itemDetail.time)}
          locale={languageStore.language}
          isVisible={isVisibleDate}
          mode="datetime"
          onConfirm={onConfirmDate}
          onCancel={() => setIsvisibleDate(false)}
          cancelTextIOS={translate("huy")}
          confirmTextIOS={translate("xacnhan")}
        />
        <ModalConfirmDelete
          isVisible={isVisible}
          onBackDropPress={() => setIsvisible(false)}
          onPressRemove={onPressRemoveItem}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={$container}>
            <TextField
              require
              value={itemDetail.content}
              labelTx="trangthai"
              onChangeText={(text) =>
                setItemDetail({
                  ...itemDetail,
                  content: text,
                })
              }
              editable={edit}
              containerStyle={$viewInput}
              multiline
            />
            <TextField
              value={utils.displayDateHour(itemDetail.time)}
              labelTx="thoigian"
              editable={false}
              containerStyle={$viewInput}
              RightAccessory={RighAcessory}
              inputWrapperStyle={{ alignItems: "center" }}
              onPressIn={() => {
                if (edit) {
                  setIsvisibleDate(true)
                }
              }}
            />
            <Text preset="medium" tx="bieutuongcamxuc" style={$textHead} />
            <FlatList
              data={listEmoji}
              keyExtractor={(_, index) => `${index}`}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => {
                return (
                  <View
                    onStartShouldSetResponder={() => true}
                    style={{ paddingHorizontal: 16, alignItems: "center" }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (edit) {
                          setItemDetail({
                            ...itemDetail,
                            emoji: item.emoji.toString(),
                          })
                        }
                      }}
                    >
                      <Image key={index} source={item.emoji} style={$imgEmoji} />
                    </TouchableOpacity>
                    {item.emoji == itemDetail.emoji ? (
                      <View
                        style={{
                          backgroundColor: colors.primary500,
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                        }}
                      />
                    ) : null}
                  </View>
                )
              }}
              horizontal
              //  style={{ flexDirection: "row" }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ backgroundColor: colors.neutral000, padding: 6 }}
            />
            <Text preset="medium" tx="hinhanh" style={$textHead} />
            {DisplayImage}
            {!edit && listImages.length <= 0 ? (
              <Image source={ImageConstant.imageEmty} style={$image} />
            ) : null}
            <TextField
              value={itemDetail.location}
              labelTx="vitri"
              editable={edit}
              containerStyle={$viewInput}
              onChangeText={(text) =>
                setItemDetail({
                  ...itemDetail,
                  location: text,
                })
              }
            />
            <TextField
              value={itemDetail.url}
              label="URL"
              editable={edit}
              containerStyle={$viewInput}
              onChangeText={(text) =>
                setItemDetail({
                  ...itemDetail,
                  url: text,
                })
              }
            />
            <View style={{ height: 80 }} />
          </View>
        </ScrollView>
        {edit ? (
          <View style={$viewButton}>
            <Button tx="luu" textStyle={$textButton} onPress={onUpdate} />
          </View>
        ) : null}
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $viewButton: ViewStyle = {
  position: "absolute",
  width: "100%",
  bottom: 0,
  padding: 16,
  backgroundColor: colors.neutral000,
  ...configs.shadow,
}
const $textButton: TextStyle = { ...typography.textBold, fontSize: 14, color: colors.neutral000 }
const $container: ViewStyle = {
  flex: 1,
  padding: 16,
}
const $viewInput: ViewStyle = {
  marginTop: 12,
}
const $textHead: TextStyle = {
  paddingVertical: 12,
  color: colors.neutral700,
  fontSize: 14,
}
const $imgEmoji: ImageStyle = {
  width: 60,
  height: 60,
  resizeMode: "contain",
}
const $image: ImageStyle = {
  height: 150,
  width: 150,
  resizeMode: "contain",
  alignSelf: "center",
}
