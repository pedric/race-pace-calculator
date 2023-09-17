import styled from '@emotion/styled';
import { theme } from './theme';

// export const Wrapper = styled.div({
// 	margin: '0 auto',
// 	maxWidth: '400px',
// });

// export const Main = styled.main({
// 	margin: '2em 1em',
// });

export const Wrapper = styled.div`
	position: relative;
	margin: 0 0.5em;
	max-width: 460px;
	width: calc(100vw - 1em);
	background: ${theme.white};
	padding: 1em;
	border-radius: 20px;
	border: 1px solid ${theme.gray};
`;

export const BackDrop = styled.main`
	background: rgba(0, 0, 0, 0.08);
	min-height: 100vh;
	min-width: 100vw;
	display: flex;
	justify-content: center;
	align-items: flex-start;
`;
