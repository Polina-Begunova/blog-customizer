import { useEffect } from 'react';

type UseCloseOnOutsideClickOrEsc = {
	isOpenElement: boolean;
	onClose?: () => void;
	elementRef: React.RefObject<HTMLElement>;
};

export const useCloseOnOutsideClickOrEsc = ({
	isOpenElement,
	elementRef,
	onClose,
}: UseCloseOnOutsideClickOrEsc) => {
	useEffect(() => {
		if (!isOpenElement) {
			return;
		}

		const handleClick = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!elementRef.current?.contains(event.target)
			) {
				onClose?.();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpenElement, elementRef, onClose]);
};
