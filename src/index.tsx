import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useMemo } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Добавляем состояние для открытия/закрытия формы
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	// Состояние для текущих примененных настроек статьи
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	// useMemo для оптимизации вычисления CSS переменных
	const cssVariables = useMemo(
		() => ({
			'--font-family': articleState.fontFamilyOption.value,
			'--font-size': articleState.fontSizeOption.value,
			'--font-color': articleState.fontColor.value,
			'--container-width': articleState.contentWidth.value,
			'--bg-color': articleState.backgroundColor.value,
		}),
		[articleState]
	); // ← Зависимость от articleState
	// Функция применения настроек
	const handleApply = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	// Функция сброса настроек
	const handleReset = () => {
		setArticleState(defaultArticleState);
	};
	return (
		<main className={clsx(styles.main)} style={cssVariables as CSSProperties}>
			{/*ArticleParamsForm теперь получает пропсы */}
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
