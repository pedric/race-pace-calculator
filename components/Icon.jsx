import styled from '@emotion/styled';
import FeatherIcon from 'feather-icons-react';

const Icon = ({ icon, size = 24 }) => {
	return <FeatherIcon icon={icon} size={size || 24} />;
};

export default Icon;
