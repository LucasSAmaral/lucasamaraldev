import React from 'react';
import DeskCardComponent from '../DeskCard.component';
import { getComponentPseudoValues } from './helper/test.helper';

describe('<DeskCardComponent />', () => {
  it('should render pseudo elements on left position', () => {
    cy.mount(<DeskCardComponent cardPosition="left" />);

    cy.getDataCy('desk-card-component').then(el => {
      const { after, before, contentValue } = getComponentPseudoValues(el);

      const beforeRightPropValue = before?.getPropertyValue('right');

      const afterRightPropValue = after?.getPropertyValue('right');

      expect(contentValue).to.eq('"+"');
      expect(beforeRightPropValue).to.eq('-33px');
      expect(afterRightPropValue).to.eq('-5px');
    });
  });

  it('should render pseudo elements on right position', () => {
    cy.mount(<DeskCardComponent cardPosition="right" />);

    cy.getDataCy('desk-card-component').then(el => {
      const { after, before, contentValue } = getComponentPseudoValues(el);

      const beforeLeftPropValue = before?.getPropertyValue('left');

      const afterLeftPropValue = after?.getPropertyValue('left');

      expect(contentValue).to.eq('"+"');
      expect(beforeLeftPropValue).to.eq('-33px');
      expect(afterLeftPropValue).to.eq('-5px');
    });
  });
});
