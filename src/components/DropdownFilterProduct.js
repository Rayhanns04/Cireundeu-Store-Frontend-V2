import React, { memo } from "react";
import styled from "styled-components";
import NewIcon from "../assets/images/New.svg";
import LowerPriceIcon from "../assets/images/LowerPrice.svg";
import HighPriceIcon from "../assets/images/dollar 1.svg";

const DropdownFilterProduct = ({
	isOpen,
	imegStateValidation,
	handleClick,
	optionValue,
	DropDownConfig,
	getSorts,
}) => {
	const items = [
		{
			id: 1,
			name: "Terbaru",
			icon: NewIcon,
		},
		{
			id: 2,
			name: "Harga Tertinggi",
			icon: HighPriceIcon,
		},
		{
			id: 3,
			name: "Harga Terendah",
			icon: LowerPriceIcon,
		},
	];

	// ===================== Styled Components
	const Dropdown = styled.div`
		width: 15rem;
		height: 100%;
		position: relative;
		margin-bottom: ${DropDownConfig.dropdown_mb}px;
	`;

	const InputSelect = styled.div`
		width: 100%;
		text-align: left;
		text-decoration: none;
		background-color: transparant;
		position: relative;
		border: 2px solid #f4f4f4;
		z-index: 2;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		padding: ${DropDownConfig.inputselect_paddingtb}px
			${DropDownConfig.inputselect_paddingrl}px;
		border-radius: ${DropDownConfig.inputselect_radius}px;
		cursor: pointer;
	`;

	const Select = styled.div`
		width: 100%;
		text-align: center;
		border-radius: ${DropDownConfig.select_borderadiustl}px
			${DropDownConfig.select_borderadiustr}px
			${DropDownConfig.select_borderadiusbr}px
			${DropDownConfig.select_borderadiusbl}px;
		text-decoration: none;

		position: absolute;
		margin-top: 10px;
		z-index: 1;
		display: ${isOpen ? "block" : "none"};
		background-color: white;
		border: 2px solid #f4f4f4;

		padding: 8px;
	`;

	const Tittle = styled.p`
		font-family: "Poppins", sans-serif;
		font-weight: ${DropDownConfig.title_weight};
		color: #000000;
		text-align: center;
		font-size: ${DropDownConfig.title_fontsize}px;
	`;

	const Chevron = styled.img``;

	const SubIcons = styled.img`
		width: 28px;
	`;

	const OptionItemContainer = styled.div`
		text-align: left;
		color: black;
		font-weight: 400;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 10px;
		padding: 8px;
		transition: all 150ms linear;

		&:hover {
			-webkit-transform: scale(1.2);
			-ms-transform: scale(1.2);
			transform: scale(1.2);
			background-color: #f9f9f9;
			transition: all 150ms linear;
		}
	`;

	const OptionItem = styled.p`
		text-align: left;
		font-family: "Josefin Sans", sans-serif;
		color: #000000;
		margin-left: 12px;
		cursor: pointer;
	`;

	return (
		<Dropdown>
			<InputSelect onClick={handleClick}>
				<Tittle>{optionValue}</Tittle>
				<Chevron src={imegStateValidation()} alt="chevron" />
			</InputSelect>

			<Select>
				{items.map((item, id) => {
					return (
						<OptionItemContainer
							key={id}
							onClick={() => getSorts(item.name)}
						>
							<SubIcons src={item.icon} alt="NewIcon" />
							<OptionItem>{item.name}</OptionItem>
						</OptionItemContainer>
					);
				})}
			</Select>
		</Dropdown>
	);
};

export default memo(DropdownFilterProduct);
