import * as React from "react"
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  TextInputProps,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { TextField } from "./TextField"
import { LeftAccesstory } from "./ModalCreateDiary"

export interface CreateTaskChildProps extends TextInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  listTask: any
  onCreateTask: () => void
  onRemoveItem: () => void
}

/**
 * Describe your component here
 */
export const CreateTaskChild = observer(function CreateTaskChild(props: CreateTaskChildProps) {
  const { style, ...rest } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <TouchableOpacity style={$viewBtn}>
        <Text preset="regular" style={$textBtn}>Thêm nhiệm vụ nhỏ</Text>
      </TouchableOpacity>
      {[1, 2, 3, 4, 5].map((item, index) => {
        return (
          <View style={$viewTask} key={index}>
            <TextField
              value={"15 phút trước"}
              LeftAccessory={() => (
                <LeftAccesstory
                  typeIcon="Octicons"
                  nameIcon="dot-fill"
                  colorIcon={colors.primary500}
                />
              )}
              // onChangeText={setLocation}
              inputWrapperStyle={$wrapInput}
              RightAccessory={() => (
                <TouchableOpacity>
                  <LeftAccesstory typeIcon="Feather" nameIcon="x" colorIcon={colors.primary500} />
                </TouchableOpacity>
              )}
              {...rest}
            />
          </View>
        )
      })}
    </View>
  )
})

const $container: ViewStyle = {}

const $viewTask: ViewStyle = {
  marginTop: 8,
}
const $wrapInput: ViewStyle = {
  borderWidth: 0,
  backgroundColor: colors.neutral000,
  alignItems: "center",
}

const $viewBtn: ViewStyle = {
  backgroundColor: colors.primary500,
  padding: 8,
  marginTop: 8,
  borderRadius: 4,
  width: "60%"
}
const $textBtn: TextStyle = {
  color:colors.neutral000,
  textAlign: 'center',
  fontSize: 14
}