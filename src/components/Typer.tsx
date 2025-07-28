import {useCurrentFrame} from 'remotion';

const typingSpeed = 3; // Faster typing speed

export const Typer: React.FC<{text: string; startFrame: number}> = ({
	text,
	startFrame,
}) => {
	const frame = useCurrentFrame();
	const parentFrame = frame; // Use the global frame
	
	// Calculate when this component should start typing relative to its parent
	const shouldStartTyping = parentFrame >= startFrame;
	
	if (!shouldStartTyping) {
		return <span></span>;
	}

	const frameOffset = parentFrame - startFrame;
	const charsToShow = Math.min(Math.floor(frameOffset / typingSpeed), text.length);
	const textToShow = text.slice(0, charsToShow);

	return <span>{textToShow}</span>;
}; 