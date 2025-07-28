import {Composition} from 'remotion';
import {MyComposition, myCompSchema} from './Composition';
import './index.css';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComposition"
				component={MyComposition}
				durationInFrames={1800} // 60 seconds at 30fps
				fps={30}
				width={1280}
				height={1024}
				schema={myCompSchema}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: '#000000',
					logoColor: '#000000',
				}}
			/>
		</>
	);
};
