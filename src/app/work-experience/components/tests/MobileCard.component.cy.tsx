import React from 'react';
import MobileCardComponent from '../MobileCard.component';
import { getComponentPseudoValues } from './helper/test.helper';

describe('<MobileCardComponent />', () => {
  it('should render MobileCardComponent without pseudo elements', () => {
    cy.mount(<MobileCardComponent />);

    cy.get('[data-cy=mobile-card-component]').then(el => {
      const { after, before, contentValue } = getComponentPseudoValues(el);

      const beforeRightPropValue = before?.getPropertyValue('right');
      const beforeLeftPropValue = before?.getPropertyValue('left');

      const afterRightPropValue = after?.getPropertyValue('right');
      const afterLeftPropValue = after?.getPropertyValue('left');

      expect(contentValue).to.eq('none');
      expect(beforeRightPropValue).to.eq('auto');
      expect(beforeLeftPropValue).to.eq('auto');
      expect(afterRightPropValue).to.eq('auto');
      expect(afterLeftPropValue).to.eq('auto');
    });
  });
});
