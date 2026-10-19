import { TransitionStateType } from '@/app/template';
import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { NavigationMenuContext } from './NavigationMenu.context';
import { useContext } from 'react';
import { breakpoints, colors, radii, transitions } from '@/app/styles/theme';

const exitingObject = { exiting: true };

type NavigationMenuOptionComponentProps = {
  children: React.ReactNode;
  nextRoute: string;
  setTransitionState: React.Dispatch<React.SetStateAction<TransitionStateType>>;
};

const NavigationMenuOptionComponent: React.FC<NavigationMenuOptionComponentProps> = ({
  children,
  nextRoute,
  setTransitionState,
}) => {
  const actualRoute = usePathname();

  const { updateNavigationMenuMobileStatus } = useContext(NavigationMenuContext);

  const nextRouteDataCy =
    nextRoute.split('/')[1] === '' ? 'home-option' : `${nextRoute.split('/')[1]}-option`;

  const isActive = actualRoute === nextRoute;

  return (
    <NavigationMenuOption
      href={nextRoute}
      data-cy={nextRouteDataCy}
      aria-current={isActive ? 'page' : undefined}
      onClick={event => {
        event.preventDefault();
        if (!isActive) {
          setTransitionState({ ...exitingObject, nextRoute });
        }
        if (window.innerWidth <= breakpoints.navigationMenu) {
          updateNavigationMenuMobileStatus('CLOSING');
        }
      }}
    >
      {children}
    </NavigationMenuOption>
  );
};

const NavigationMenuOption = styled(Link)`
  padding: 9px 16px;
  border-radius: ${radii.pill};
  color: ${colors.textMuted};
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition:
    color ${transitions.fast},
    background-color ${transitions.fast};

  &:hover {
    color: ${colors.text};
  }

  &[aria-current='page'] {
    color: ${colors.accent};
    background-color: ${colors.accentSoft};
  }

  @media (max-width: ${breakpoints.navigationMenu}px) {
    display: flex;
    align-items: center;
    min-height: 48px;
    border-radius: ${radii.md};
    font-size: 17px;
  }
`;

export default NavigationMenuOptionComponent;
