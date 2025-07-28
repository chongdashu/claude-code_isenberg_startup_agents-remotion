import {useCurrentFrame} from 'remotion';
import {TodoItem} from '../data';
import {Typer} from './Typer';

const listStyle: React.CSSProperties = {
	listStyleType: 'none',
	paddingLeft: 0,
	marginTop: 12,
	lineHeight: 1.6,
	fontSize: 14,
};

const listItemStyle: React.CSSProperties = {
	marginBottom: 8,
	display: 'flex',
	alignItems: 'flex-start',
	opacity: 0.9,
};

const checkboxStyle: React.CSSProperties = {
	marginRight: 12,
	color: '#4A9EFF',
	fontSize: 16,
	fontWeight: 'bold',
	flexShrink: 0,
	marginTop: 1,
	textShadow: '0 0 4px rgba(74, 158, 255, 0.3)',
};

const todoTextStyle: React.CSSProperties = {
	color: '#E0E0E0',
	flex: 1,
};

export const TodoList: React.FC<{todos: TodoItem[]; startFrame: number}> = ({
	todos,
	startFrame,
}) => {
	const frame = useCurrentFrame();

	if (frame < startFrame) {
		return null;
	}

	const frameOffset = frame - startFrame;
	
	// Calculate which items should be visible and their individual start times
	const itemsToShow: Array<{todo: TodoItem; index: number; itemStartFrame: number}> = [];
	let currentFrame = 0;
	
	for (let i = 0; i < todos.length; i++) {
		const todo = todos[i];
		const itemStartFrame = currentFrame;
		
		// Show this item if we've reached its start time
		if (frameOffset >= itemStartFrame) {
			itemsToShow.push({
				todo,
				index: i,
				itemStartFrame
			});
		}
		
		// Each todo takes about 3 seconds (90 frames) to complete
		// Estimate based on text length for more realistic timing
		const estimatedTypingTime = Math.max(60, Math.min(120, todo.text.length * 2));
		currentFrame += estimatedTypingTime;
	}

	return (
		<ul style={listStyle}>
			{itemsToShow.map(({todo, index, itemStartFrame}) => (
				<li key={index} style={listItemStyle}>
					<span style={checkboxStyle}>☐</span>
					<div style={todoTextStyle}>
						<Typer 
							text={todo.text} 
							startFrame={startFrame + itemStartFrame}
						/>
					</div>
				</li>
			))}
		</ul>
	);
}; 