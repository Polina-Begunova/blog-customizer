import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import { useState, useEffect, useRef } from 'react'; // React хуки для управления состоянием
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean; // Открыта ли форма
	onToggle: () => void; // Функция открытия/закрытия
	onApply: (state: ArticleStateType) => void; // Применить настройки
	onReset: () => void; // Сбросить настройки
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	// Ссылка на сайдбар для отслеживания кликов
	const sidebarRef = useRef<HTMLElement>(null);

	// Хук для закрытия при клике вне сайдбара
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				isOpen
			) {
				onToggle();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onToggle]);

	// Состояние для настроек в форме
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// Обработчики для каждого поля
	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[0]) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
	};

	const handleFontColorChange = (option: (typeof fontColors)[0]) => {
		setFormState((prev) => ({ ...prev, fontColor: option }));
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[0]
	) => {
		setFormState((prev) => ({ ...prev, backgroundColor: option }));
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[0]) => {
		setFormState((prev) => ({ ...prev, contentWidth: option }));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[0]) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: option }));
	};

	// Обработчик сброса
	const handleFormReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	// Обработчик применения
	const handleFormApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};
	return (
		<>
			{/* передача актуального состояния и обработчика */}
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={sidebarRef} // реф для отслеживания кликов
				className={clsx(styles.container, { [styles.container_open]: isOpen })} // ← ДОБАВЛЕНО: условный класс
			>
				<form
					className={styles.form}
					onSubmit={handleFormApply} // обработчик отправки
				>
					{/* вся форма с настройками */}
					<Text as='h2' size={31} weight={800} uppercase>
						Шрифт
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='Выберите шрифт'
						placeholder='Шрифт'
					/>

					<Separator />

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>

					<Separator />

					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
						placeholder='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
						placeholder='Цвет фона'
					/>

					<Separator />

					<RadioGroup
						name='contentWidth'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						{/* обработчики для кнопок */}
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleFormReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
