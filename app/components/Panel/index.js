import styled from 'styled-components';
import theme from '../../styles/theme';

export const Panel = styled.div`
  background: ${theme.color.secondary};
  border: 0.1rem solid ${theme.color.border};
  border-radius: ${theme.borderRadius};
  text-align: ${props => (props.isLeftAligned ? 'left' : 'center')};
  color: white;
  & + & {
    margin-top: 3rem;
  }
`;

export const PanelHeader = styled.div`
  background: ${props =>
    props.isLight ? 'inherit' : theme.color.lightBackground};
  padding: 1.7rem;
  text-transform: uppercase;
  font-size: ${theme.fontSize.small};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.textMuted};
  border-bottom: 0.1rem solid ${theme.color.border};
`;

export const PanelBody = styled.div`
  padding: 3rem;
`;
