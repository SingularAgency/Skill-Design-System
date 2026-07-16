import SwiftUI

public enum SingularSurfaceVariant {
  case panel, compactCard, row, feature, modal, raised

  var radius: CGFloat {
    switch self {
    case .panel: SingularRadius.panel
    case .compactCard, .row: SingularRadius.compactCard
    case .feature: SingularRadius.featureCard
    case .modal: SingularRadius.modal
    case .raised: SingularRadius.control
    }
  }
}

public struct SingularSurfaceModifier: ViewModifier {
  let variant: SingularSurfaceVariant
  var accent: Color?
  var elevation: SingularElevation

  public func body(content: Content) -> some View {
    let radius = variant.radius
    let fill = variant == .raised ? Color.singularPanelRaised : Color.singularPanel

    content
      .background {
        RoundedRectangle(cornerRadius: radius, style: .continuous).fill(fill)
      }
      .overlay {
        if let accent {
          RoundedRectangle(cornerRadius: radius, style: .continuous)
            .fill(
              LinearGradient(
                colors: [accent.opacity(0.035), .clear, accent.opacity(0.012)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
              )
            )
            .allowsHitTesting(false)
        }
      }
      .overlay {
        RoundedRectangle(cornerRadius: radius, style: .continuous)
          .stroke(accent?.opacity(0.14) ?? Color.singularBorder, lineWidth: 1)
      }
      .clipShape(RoundedRectangle(cornerRadius: radius, style: .continuous))
      .shadow(
        color: Color.black.opacity(elevation.opacity),
        radius: elevation.radius,
        x: 0,
        y: elevation.y
      )
  }
}

public extension View {
  func singularSurface(
    _ variant: SingularSurfaceVariant = .panel,
    accent: Color? = nil,
    elevation: SingularElevation = .low
  ) -> some View {
    modifier(SingularSurfaceModifier(variant: variant, accent: accent, elevation: elevation))
  }

  func singularScreenPadding() -> some View {
    padding(.horizontal, SingularLayout.screenInset)
      .padding(.bottom, SingularLayout.componentGap)
  }

  func singularBottomBarChrome() -> some View {
    padding(.horizontal, SingularLayout.screenInset)
      .padding(.vertical, SingularLayout.tight)
      .background(.ultraThinMaterial)
  }
}

public enum SingularActionButtonRole {
  case primary, secondary
}

public enum SingularActionButtonSize {
  case compact, regular, large

  var height: CGFloat {
    switch self {
    case .compact: 42
    case .regular: 46
    case .large: 52
    }
  }

  var horizontalPadding: CGFloat {
    switch self {
    case .compact: 12
    case .regular: 16
    case .large: 20
    }
  }
}

public struct SingularActionButtonStyle: ButtonStyle {
  @Environment(\.isEnabled) private var isEnabled

  var role: SingularActionButtonRole = .primary
  var size: SingularActionButtonSize = .regular

  public func makeBody(configuration: Configuration) -> some View {
    let foreground = role == .primary ? Color.white : Color.singularAction
    let background =
      role == .primary ? Color.singularAction : Color.singularAction.opacity(0.13)

    configuration.label
      .font(size == .large ? .singularBodyEmphasis : .singularMetaEmphasis)
      .foregroundStyle(foreground.opacity(isEnabled ? 1 : 0.58))
      .lineLimit(1)
      .minimumScaleFactor(0.82)
      .padding(.horizontal, size.horizontalPadding)
      .frame(maxWidth: .infinity)
      .frame(height: size.height)
      .background(
        background.opacity(isEnabled ? (configuration.isPressed ? 0.78 : 1) : 0.42),
        in: Capsule()
      )
      .overlay {
        Capsule().stroke(Color.singularAction.opacity(role == .primary ? 0.1 : 0.18))
      }
      .scaleEffect(configuration.isPressed ? 0.985 : 1)
      .animation(.snappy(duration: 0.14), value: configuration.isPressed)
  }
}

public extension ButtonStyle where Self == SingularActionButtonStyle {
  static func singularAction(
    _ role: SingularActionButtonRole = .primary,
    size: SingularActionButtonSize = .regular
  ) -> SingularActionButtonStyle {
    SingularActionButtonStyle(role: role, size: size)
  }
}

public struct SingularDetailHeader: View {
  public let eyebrow: String?
  public let title: String
  public let subtitle: String?
  public let icon: String?
  public let accent: Color

  public init(
    eyebrow: String? = nil,
    title: String,
    subtitle: String? = nil,
    icon: String? = nil,
    accent: Color = .singularAction
  ) {
    self.eyebrow = eyebrow
    self.title = title
    self.subtitle = subtitle
    self.icon = icon
    self.accent = accent
  }

  public var body: some View {
    HStack(alignment: .top, spacing: SingularSpacing.sm) {
      if let icon {
        Image(systemName: icon)
          .font(.system(size: 15, weight: .semibold))
          .foregroundStyle(accent)
          .frame(width: SingularIconSize.lg, height: SingularIconSize.lg)
          .background(accent.opacity(0.08), in: Circle())
      }

      VStack(alignment: .leading, spacing: SingularSpacing.xxs + 2) {
        if let eyebrow, !eyebrow.isEmpty {
          Text(eyebrow.uppercased())
            .font(.singularEyebrow)
            .foregroundStyle(Color.singularTextSecondary)
        }
        Text(title)
          .font(.singularPageTitle)
          .foregroundStyle(Color.singularTextPrimary)
        if let subtitle, !subtitle.isEmpty {
          Text(subtitle)
            .font(.singularSubheadline)
            .foregroundStyle(Color.singularTextSecondary)
        }
      }
      .frame(maxWidth: .infinity, alignment: .leading)
    }
  }
}

public struct SingularMetricTile: View {
  public let value: String
  public let label: String
  public var accent: Color = .singularAction

  public init(value: String, label: String, accent: Color = .singularAction) {
    self.value = value
    self.label = label
    self.accent = accent
  }

  public var body: some View {
    VStack(alignment: .leading, spacing: SingularSpacing.xxxs + 1) {
      Text(value).font(.singularMetric).foregroundStyle(Color.singularTextPrimary)
      Text(label).font(.singularMeta).foregroundStyle(Color.singularTextSecondary)
    }
    .frame(maxWidth: .infinity, alignment: .leading)
    .padding(.vertical, SingularSpacing.xs + 2)
    .padding(.horizontal, SingularSpacing.sm)
    .singularSurface(.compactCard, accent: accent, elevation: .none)
  }
}

public struct SingularEmptyState: View {
  public let title: String
  public let message: String
  public var icon: String = "checkmark.seal"
  public var accent: Color = .singularAction

  public init(
    title: String,
    message: String,
    icon: String = "checkmark.seal",
    accent: Color = .singularAction
  ) {
    self.title = title
    self.message = message
    self.icon = icon
    self.accent = accent
  }

  public var body: some View {
    VStack(spacing: SingularSpacing.sm) {
      Image(systemName: icon)
        .font(.system(size: 28, weight: .semibold))
        .foregroundStyle(accent)
        .frame(width: SingularIconSize.xl, height: SingularIconSize.xl)
        .background(accent.opacity(0.08), in: Circle())
      Text(title).font(.singularHeading).foregroundStyle(Color.singularTextPrimary)
      Text(message)
        .font(.singularSubheadline)
        .foregroundStyle(Color.singularTextSecondary)
        .multilineTextAlignment(.center)
    }
    .frame(maxWidth: .infinity)
    .padding(SingularSpacing.xl)
    .singularSurface(.panel, accent: accent)
  }
}
