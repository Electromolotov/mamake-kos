import { StyleSheet } from 'react-native';

export const hairlineWidth = StyleSheet.hairlineWidth

export const baseStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#111',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginBottom: 10,
  },

  title: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  titleText: {
    color: '#a8a8a8',
    fontSize: 13,
    fontWeight: '600',
  },
  message: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f7f7f7',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  messageText: {
    color: '#a8a8a8',
    fontSize: 13,
    textAlign: 'center',
  },

  optionsContainer: {
    borderRadius: 12,
  },
  options: {
    backgroundColor: '#dfdfdf',
  },
  buttonContainer: {
    marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  buttonTitle: {
    fontSize: 20,
  },

  cancelButton: {
    borderRadius: 12,
  },
  cancelTitle: {
    fontWeight: '600',
  },
})

export const androidStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#e5e5e5',
  },

  title: {
  
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  message: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f7f7f7',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  optionsContainer: {},
  buttonContainer: {
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },

  cancelButton: {},
})
