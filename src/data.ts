import {z} from 'zod';

export const TodoItemSchema = z.object({
	text: z.string(),
});

export type TodoItem = z.infer<typeof TodoItemSchema>;

export const TodoListSchema = z.object({
	items: z.array(TodoItemSchema),
});

export type TodoList = z.infer<typeof TodoListSchema>;

export const UserReviewSchema = z.object({
	color: z.string(),
	name: z.string(),
	title: z.string(),
	status: z.string(),
	statusDetail: z.string().optional(),
	todos: TodoListSchema.optional(),
	textFace: z.string().optional(),
});

export type UserReview = z.infer<typeof UserReviewSchema>;

export const reviewsData: UserReview[] = [
	{
		color: '#86E5A0',
		name: 'account-executive-revenue-at',
		title: 'Account Executive Revenue Analysis',
		status: 'Done (1 tool use • 18.4k tokens • 20.4s)',
		textFace: '(＾◡＾)っ✂❤',
	},
	{
		color: '#D4BFFF',
		name: 'customer-success-manager-at',
		title: 'Customer Success Analysis',
		status: 'Initializing...',
		textFace: '(◍•ᴗ•◍)♡',
	},
	{
		color: '#86E5A0',
		name: 'product-engineer-at',
		title: 'Product Engineering Assessment',
		status: 'Update Todos',
		textFace: '(╯°o°)ᕗ',
		todos: {
			items: [
				{text: 'Analyze customer technical requirements and current integration status'},
				{text: 'Assess product capabilities alignment with customer needs and usage patterns'},
				{text: 'Identify feature gaps that could impact renewal decision'},
				{text: 'Identify technical risks that could affect renewal'},
				{text: 'Evaluate technical integration opportunities for account expansion'},
				{text: 'Assess product roadmap alignment with customer strategic initiatives'},
				{text: 'Provide recommendations for product enhancements and expansion opportunities'},
				{text: '+1 more tool use'},
			],
		},
	},
	{
		color: '#D4BFFF',
		name: 'managed-services-engineer-at',
		title: 'Managed Services Analysis',
		status: 'Update Todos',
		textFace: 'ʕ•ᴥ•ʔ',
		todos: {
			items: [
				{text: 'Analyze customer implementation health and performance metrics'},
				{text: 'Assess optimization opportunities for improved customer outcomes'},
				{text: 'Identify implementation risks that could affect renewal'},
				{text: 'Compile comprehensive QBR recommendations and technical roadmap'},
				{text: 'Evaluate impact of recent product updates on customer environment'},
				{text: 'Assess customer technical satisfaction and support experience'},
				{text: 'Identify managed services expansion opportunities'},
				{text: '+1 more tool use'},
			],
		},
	},
	{
		color: '#F9E48C',
		name: 'customer-support-at',
		title: 'Customer Support Analysis',
		status: 'Update Todos',
		textFace: '¯\\_(ツ)_/¯',
		todos: {
			items: [
				{text: 'Analyze support ticket trends and volume patterns for ACME account'},
				{text: 'Evaluate ticket resolution times and SLA compliance metrics'},
				{text: 'Assess customer satisfaction scores and feedback sentiment'},
				{text: 'Identify recurring issues and root cause patterns'},
				{text: 'Analyze escalation patterns and critical incident impact'},
				{text: 'Review support team performance and resource allocation'},
				{text: 'Develop proactive support strategy recommendations'},
				{text: 'Create QBR presentation with key insights and action items'},
				{text: '+1 more tool use'},
			],
		},
	},
]; 