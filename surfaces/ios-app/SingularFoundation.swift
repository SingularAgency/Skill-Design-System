import SwiftUI
import UIKit

public enum SingularSpacing {
  public static let xxxs: CGFloat = 2
  public static let xxs: CGFloat = 4
  public static let xs: CGFloat = 8
  public static let sm: CGFloat = 12
  public static let md: CGFloat = 16
  public static let lg: CGFloat = 20
  public static let xl: CGFloat = 24
  public static let xxl: CGFloat = 32
}

public enum SingularLayout {
  public static let tight = SingularSpacing.sm
  public static let standard = SingularSpacing.lg
  public static let spacious = SingularSpacing.xxl
  public static let screenInset = standard
  public static let componentGap = standard
  public static let cardPadding = standard
}

public enum SingularRadius {
  public static let control: CGFloat = 8
  public static let compactCard: CGFloat = 12
  public static let panel: CGFloat = 16
  public static let featureCard: CGFloat = 24
  public static let modal: CGFloat = 28
}

public enum SingularIconSize {
  public static let xs: CGFloat = 16
  public static let sm: CGFloat = 20
  public static let md: CGFloat = 28
  public static let lg: CGFloat = 36
  public static let xl: CGFloat = 48
}

public enum SingularElevation {
  case none, low, medium, overlay

  public var radius: CGFloat {
    switch self {
    case .none: 0
    case .low: 6
    case .medium: 16
    case .overlay: 30
    }
  }

  public var y: CGFloat {
    switch self {
    case .none: 0
    case .low: 2
    case .medium: 8
    case .overlay: 20
    }
  }

  public var opacity: Double {
    switch self {
    case .none: 0
    case .low: 0.04
    case .medium: 0.08
    case .overlay: 0.24
    }
  }
}

public extension Color {
  static let singularBrand = Color(red: 69 / 255, green: 103 / 255, blue: 237 / 255)
  static let singularAction = Color(red: 11 / 255, green: 132 / 255, blue: 255 / 255)
  static let singularCyan = Color(red: 34 / 255, green: 211 / 255, blue: 238 / 255)
  static let singularGreen = Color(red: 34 / 255, green: 197 / 255, blue: 94 / 255)
  static let singularAmber = Color(red: 245 / 255, green: 158 / 255, blue: 11 / 255)
  static let singularRed = Color(red: 239 / 255, green: 68 / 255, blue: 68 / 255)

  static let singularBackground = Color(
    uiColor: UIColor { traits in
      traits.userInterfaceStyle == .dark ? UIColor(hex: 0x000000) : UIColor(hex: 0xFFFFFF)
    }
  )
  static let singularPanel = Color(
    uiColor: UIColor { traits in
      traits.userInterfaceStyle == .dark ? UIColor(hex: 0x0D1117) : UIColor(hex: 0xFFFFFF)
    }
  )
  static let singularPanelRaised = Color(
    uiColor: UIColor { traits in
      traits.userInterfaceStyle == .dark ? UIColor(hex: 0x151B25) : UIColor(hex: 0xF8FAFC)
    }
  )
  static let singularBorder = Color(
    uiColor: UIColor { traits in
      traits.userInterfaceStyle == .dark
        ? UIColor.white.withAlphaComponent(0.08)
        : UIColor(hex: 0xE2E8F0)
    }
  )
  static let singularTextPrimary = Color(
    uiColor: UIColor { traits in
      traits.userInterfaceStyle == .dark ? UIColor.white : UIColor(hex: 0x0F172A)
    }
  )
  static let singularTextSecondary = Color(
    uiColor: UIColor { traits in
      traits.userInterfaceStyle == .dark ? UIColor(hex: 0x94A3B8) : UIColor(hex: 0x475569)
    }
  )
}

public extension Font {
  static let singularPageTitle = Font.system(size: 28, weight: .bold)
  static let singularTitle = Font.system(.title3, design: .default, weight: .semibold)
  static let singularHeading = Font.system(.headline, design: .default, weight: .semibold)
  static let singularBody = Font.system(.body)
  static let singularBodyEmphasis = Font.system(.body, design: .default, weight: .semibold)
  static let singularSubheadline = Font.system(.subheadline)
  static let singularMeta = Font.system(.footnote)
  static let singularMetaEmphasis = Font.system(.footnote, design: .default, weight: .semibold)
  static let singularEyebrow = Font.system(.caption, design: .default, weight: .semibold)
  static let singularMetric = Font.system(.title2, design: .default, weight: .semibold).monospacedDigit()
}

private extension UIColor {
  convenience init(hex: UInt32, alpha: CGFloat = 1) {
    self.init(
      red: CGFloat((hex >> 16) & 0xff) / 255,
      green: CGFloat((hex >> 8) & 0xff) / 255,
      blue: CGFloat(hex & 0xff) / 255,
      alpha: alpha
    )
  }
}
