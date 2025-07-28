import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';
import {reviewsData} from './data';
import {ReviewCard} from './components/ReviewCard';

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	logoColor: zColor(),
});

const backgroundStyle: React.CSSProperties = {
	background: `
		radial-gradient(ellipse at top left, rgba(139, 69, 255, 0.15) 0%, transparent 50%),
		radial-gradient(ellipse at top right, rgba(255, 105, 180, 0.1) 0%, transparent 50%),
		radial-gradient(ellipse at bottom left, rgba(75, 0, 130, 0.2) 0%, transparent 50%),
		linear-gradient(135deg, #1a0933 0%, #2D1B69 25%, #1a0933 50%, #0f051a 75%, #000000 100%)
	`,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 20, // Reduced from 40
	minHeight: '100vh',
};

const terminalWindowStyle: React.CSSProperties = {
	backgroundColor: '#1E1E1E',
	borderRadius: 16, // Slightly larger radius for more modern look
	boxShadow: `
		0 32px 64px rgba(0, 0, 0, 0.6),
		0 0 0 1px rgba(255, 255, 255, 0.05),
		inset 0 1px 0 rgba(255, 255, 255, 0.1)
	`,
	overflow: 'hidden',
	width: '96%', // Increased from 90%
	maxWidth: 1200, // Increased from 1000
	height: '94%', // Increased from 85%
	display: 'flex',
	flexDirection: 'column',
	backdropFilter: 'blur(10px)',
};

const titleBarStyle: React.CSSProperties = {
	backgroundColor: '#2D2D2D',
	background: 'linear-gradient(180deg, #3a3a3a 0%, #2D2D2D 100%)',
	height: 44, // Slightly taller
	display: 'flex',
	alignItems: 'center',
	paddingLeft: 20, // Increased padding
	borderBottom: '1px solid #404040',
	boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
};

const trafficLightStyle: React.CSSProperties = {
	width: 14, // Slightly larger
	height: 14,
	borderRadius: '50%',
	marginRight: 10, // More space between lights
	boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
};

const terminalContentStyle: React.CSSProperties = {
	color: 'white',
	fontFamily: 'Monaco, "Cascadia Code", "SF Mono", Consolas, monospace',
	fontSize: 18, // Increased from 16
	padding: 32, // Increased from 24
	flex: 1,
	overflow: 'hidden',
	lineHeight: 1.6, // Increased for better readability
	position: 'relative',
	background: 'linear-gradient(180deg, #1E1E1E 0%, #1a1a1a 100%)',
};

const titleTextStyle: React.CSSProperties = {
	color: '#E0E0E0', // Brighter text
	fontSize: 15,
	fontWeight: 600,
	marginLeft: 16,
	letterSpacing: '0.5px',
};

const ponderingStyle: React.CSSProperties = {
	position: 'absolute',
	bottom: 24, // Increased from 20
	left: 32, // Increased from 24
	color: '#FFA500',
	fontSize: 15, // Increased from 14
	display: 'flex',
	alignItems: 'center',
	fontFamily: 'Monaco, "Cascadia Code", "SF Mono", Consolas, monospace',
};

const AnimatedDots: React.FC = () => {
	const frame = useCurrentFrame();
	const dotCount = (Math.floor(frame / 20) % 3) + 1; // Change every 20 frames (about 0.67 seconds)
	return <span>{'.'.repeat(dotCount)}</span>;
};

const PonderingText: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	
	// Calculate elapsed seconds (starting from 45s)
	const elapsedSeconds = Math.floor(frame / fps);
	const currentSeconds = 45 + elapsedSeconds;
	
	// Calculate tokens (starting from 1.1k, incrementing by ~50-100 every few seconds)
	const tokenIncrement = Math.floor(elapsedSeconds / 3) * (50 + Math.floor(Math.random() * 50));
	const baseTokens = 1100; // 1.1k in actual number
	const currentTokens = baseTokens + tokenIncrement;
	
	// Format tokens back to k notation
	const formatTokens = (tokens: number): string => {
		if (tokens >= 1000) {
			const kValue = (tokens / 1000).toFixed(1);
			return `${kValue}k`;
		}
		return tokens.toString();
	};
	
	return (
		<div style={ponderingStyle}>
			<span style={{ marginRight: 10, fontSize: 18 }}>✱</span>
			Pondering<AnimatedDots /> ({currentSeconds}s • {formatTokens(currentTokens)} tokens • esc to interrupt)
		</div>
	);
};

// Calculate timing for each agent
const calculateAgentTiming = (agentIndex: number) => {
	let totalFrames = 0;
	
	for (let i = 0; i < agentIndex; i++) {
		const agent = reviewsData[i];
		if (agent.todos) {
			// Time for "Update Todos" text + time for all todo items
			const updateTodosTime = 60; // 2 seconds
			const todosTime = agent.todos.items.length * 90; // 3 seconds per todo
			totalFrames += updateTodosTime + todosTime;
		} else {
			// Just time for status text
			totalFrames += 90; // 3 seconds
		}
	}
	
	return totalFrames;
};

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = () => {
	const {durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();

	// Calculate scroll offset to keep content visible
	const scrollOffset = interpolate(
		frame,
		[0, durationInFrames * 0.3, durationInFrames * 0.7, durationInFrames],
		[0, 0, -200, -400],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<AbsoluteFill style={backgroundStyle}>
			<div style={terminalWindowStyle}>
				{/* Terminal Title Bar */}
				<div style={titleBarStyle}>
					<div style={{...trafficLightStyle, backgroundColor: '#FF5F57'}} />
					<div style={{...trafficLightStyle, backgroundColor: '#FFBD2E'}} />
					<div style={{...trafficLightStyle, backgroundColor: '#28CA42'}} />
					<div style={titleTextStyle}>Claude Code Terminal</div>
				</div>
				
				{/* Terminal Content */}
				<div style={terminalContentStyle}>
					<div style={{ transform: `translateY(${scrollOffset}px)` }}>
						{reviewsData.map((review, index) => {
							const startFrame = calculateAgentTiming(index);
							return (
								<ReviewCard
									key={review.name}
									review={review}
									startFrame={startFrame}
								/>
							);
						})}
					</div>
					
					{/* Terminal Footer - Now inside the frame */}
					<PonderingText />
				</div>
			</div>
		</AbsoluteFill>
	);
};
