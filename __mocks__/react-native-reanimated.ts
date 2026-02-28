const Reanimated = {
  default: {
    call: () => {},
    createAnimatedComponent: (component: any) => component,
    addWhitelistedUIProps: () => {},
    addWhitelistedNativeProps: () => {},
  },
}

export default Reanimated.default
export const useSharedValue = jest.fn((init) => ({ value: init }))
export const useAnimatedStyle = jest.fn((fn) => fn())
export const withTiming = jest.fn((val) => val)
export const withSpring = jest.fn((val) => val)
export const FadeIn = { duration: jest.fn().mockReturnThis() }
export const FadeOut = { duration: jest.fn().mockReturnThis() }
export const SlideInRight = { duration: jest.fn().mockReturnThis() }
export const SlideOutLeft = { duration: jest.fn().mockReturnThis() }
