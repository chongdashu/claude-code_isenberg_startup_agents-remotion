import {useCurrentFrame} from 'remotion';
import {UserReview} from '../data';
import {TodoList} from './TodoList';
import {Typer} from './Typer';

const cardStyle: React.CSSProperties = {
	padding: '12px 0',
	marginBottom: 20,
	borderLeft: '3px solid transparent',
	paddingLeft: 12,
	transition: 'all 0.3s ease',
};

const headerStyle: React.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	marginBottom: 8,
};

const dotStyle: React.CSSProperties = {
	width: 10,
	height: 10,
	borderRadius: '50%',
	marginRight: 12,
	flexShrink: 0,
	boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
};

const nameStyle: React.CSSProperties = {
	fontWeight: 600,
	marginRight: 12,
	fontSize: 16,
	letterSpacing: '0.5px',
};

const textFaceStyle: React.CSSProperties = {
	marginRight: 10,
	fontSize: 18,
	filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))',
};

const titleStyle: React.CSSProperties = {
	color: '#A0A0A0',
	fontSize: 15,
	fontStyle: 'italic',
};

const statusStyle: React.CSSProperties = {
	marginLeft: 34,
	fontSize: 15,
};

export const ReviewCard: React.FC<{review: UserReview; startFrame: number}> = ({
	review,
	startFrame,
}) => {
	const frame = useCurrentFrame();

	if (frame < startFrame) {
		return null;
	}

	const frameOffset = frame - startFrame;

	// Add a subtle glow effect based on the agent's color
	const cardStyleWithGlow: React.CSSProperties = {
		...cardStyle,
		borderLeftColor: review.color,
		backgroundColor: `${review.color}08`, // Very subtle background tint
	};

	return (
		<div style={cardStyleWithGlow}>
			<div style={headerStyle}>
				<div style={{...dotStyle, backgroundColor: review.color}} />
				{review.textFace && (
					<span style={textFaceStyle}>{review.textFace}</span>
				)}
				<div style={{...nameStyle, color: review.color}}>{review.name}</div>
				<div style={titleStyle}>({review.title})</div>
			</div>
			<div style={statusStyle}>
				{review.todos ? (
					<>
						<Typer text="Update Todos" startFrame={startFrame} />
						<TodoList todos={review.todos.items} startFrame={startFrame + 45} />
					</>
				) : (
					<Typer text={review.status} startFrame={startFrame} />
				)}
			</div>
		</div>
	);
}; 