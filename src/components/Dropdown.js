import React, { memo, useCallback, useState } from "react";
import styled from "styled-components";
import ChevronUp from "../assets/images/chevron-white-up.svg";
import ChevronDown from "../assets/images/chevron-white-down.svg";

const Dropdown = ({
	DropDownConfig,
	category,
	subcategory,
	getCategoryName,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	// ====================== Function
	const handleClick = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const imegStateValidation = useCallback(() => {
		if (!isOpen) return ChevronDown;

		return ChevronUp;
	}, [isOpen]);

	// ===================== Styled Components
	const Dropdown = styled.div`
		width: ${DropDownConfig.dropdown_width}%;
		position: relative;
		margin-bottom: ${DropDownConfig.dropdown_mb}px;
		border: 3px sold #ffffff;
	`;

	const InputSelect = styled.div`
		width: 100%;
		text-align: left;
		text-decoration: none;
		background-color: transparant;
		position: relative;
		z-index: 2;
		border: 2px solid #8a3730;

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
		text-align: left;
		border-radius: ${DropDownConfig.select_borderadiustl}px
			${DropDownConfig.select_borderadiustr}px
			${DropDownConfig.select_borderadiusbr}px
			${DropDownConfig.select_borderadiusbl}px;
		text-decoration: none;

		position: relative;
		top: ${DropDownConfig.select_top}px;
		padding-top: ${DropDownConfig.select_paddingtop}px;
		z-index: 1;
		display: ${isOpen ? "block" : "none"};
		cursor: pointer;

		max-height: 183px;
		overflow: auto;

		&::-webkit-scrollbar {
			display: none;
		}
	`;

	const Tittle = styled.p`
		font-family: "Poppins", sans-serif;
		font-weight: ${DropDownConfig.title_weight};
		color: white;
		text-align: center;
		font-size: 14px;
		text-align: left;
	`;

	const Chevron = styled.img``;

	const OptionItemContainer = styled.div`
		text-align: left;
		color: black;
		font-weight: 400;

		padding: ${DropDownConfig.optionitem_ptb}px
			${DropDownConfig.optionitem_plr}px;
	`;

	const OptionItem = styled.p`
		text-align: left;
		font-family: "Poppins", sans-serif;
		color: white;
		font-size: 14px;
		cursor: pointer;
	`;

	return (
		<Dropdown>
			<InputSelect onClick={handleClick}>
				<Tittle>{category}</Tittle>
				<Chevron src={imegStateValidation()} alt="chevron" />
			</InputSelect>

			<Select>
				<OptionItemContainer
					onClick={() => getCategoryName("Semua Produk")}
				>
					<OptionItem>{category ? "Semua Produk" : ""}</OptionItem>
				</OptionItemContainer>

				{subcategory.map((item, id) => {
					return (
						<OptionItemContainer
							key={id}
							onClick={() => getCategoryName(item.id)}
						>
							<OptionItem>{item.name}</OptionItem>
						</OptionItemContainer>
					);
				})}
			</Select>
		</Dropdown>
	);
};

export default memo(Dropdown);
