import { Platform } from 'react-native'
import ActionSheetIOS from './IosCustomActionSheet'
import ActionSheetCustomInternal from './CustomActionSheet'

export const ActionSheetCustom = ActionSheetCustomInternal

let ActionSheet

if (Platform.OS === 'ios') {
  ActionSheet = ActionSheetIOS
} else {
  ActionSheet = ActionSheetCustomInternal
}

export default ActionSheet
