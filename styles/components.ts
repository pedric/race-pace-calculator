import styled from '@emotion/styled';
import { theme } from './theme';

export const AddButton = styled.div<any>`
	display: inline-block;
	color: ${theme.cta};
	background: #fff;
	border: 1px solid ${theme.cta};
	text-align: center;
	padding: 0.25em 0.5em;
	border-radius: 9999px;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 300;
	line-height: 1.7;
	margin: 0.5em 1em;

	&:hover {
		cursor: pointer;
		background: ${theme.cta};
		color: #fff;
		border: 1px solid #fff;
	}
`;

export const InputWrapper = styled.div`
	label {
		display: block;
		margin: 0.5em;
		font-size: 0.8em;
		text-transform: uppercase;
		color: ${theme.gray};
	}
	input[type='text'],
	input[type='number'] {
		display: block;
		width: calc(100% - 1em);
		padding: 0.5em;
		border: 1px solid #ccc;
		border-radius: 2px;
		margin: 0.5em;
	}
	select {
		display: block;
		width: calc(100% - 1em);
		padding: 0.5em;
		border: 1px solid #ccc;
		border-radius: 2px;
		margin: 0.5em;
	}
`;
