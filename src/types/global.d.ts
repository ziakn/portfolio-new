import 'react';

declare module 'react' {
  namespace JSX {
    type IonIconProps = React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        name?: string;
      },
      HTMLElement
    >;

    interface IntrinsicElements {
      'ion-icon': IonIconProps;
    }
  }
}
