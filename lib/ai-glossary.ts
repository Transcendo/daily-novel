export const glossaryCategories = [
	{
		id: "fundamentals",
		title: "AI 基础概念",
		href: "/fundamentals",
		description: "先分清 AI 的基本边界、历史路线和未来设想。",
	},
	{
		id: "machine-learning",
		title: "机器学习基础",
		href: "/machine-learning",
		description: "理解模型如何从数据中学习，以及常见训练问题。",
	},
	{
		id: "model-mechanisms",
		title: "模型与训练机制",
		href: "/model-mechanisms",
		description: "把神经网络、参数、损失、优化和推理放在一张图里看。",
	},
	{
		id: "llm-prompting",
		title: "大模型与提示工程",
		href: "/llm-prompting",
		description: "理解 LLM、Token、提示、检索增强和偏好优化。",
	},
	{
		id: "generative-multimodal",
		title: "生成式与多模态",
		href: "/generative-multimodal",
		description: "把图像、视频、视觉理解和跨模态能力放到生成式 AI 里理解。",
	},
	{
		id: "agents-products",
		title: "智能体、产品与公司",
		href: "/agents-products",
		description: "从智能体、聊天机器人、产品和公司理解 AI 的真实入口。",
	},
	{
		id: "frontier",
		title: "前沿、安全与治理",
		href: "/frontier",
		description: "关注对齐、偏差、幻觉、可解释性和能力涌现。",
	},
	{
		id: "infrastructure",
		title: "算力与基础设施",
		href: "/infrastructure",
		description: "理解算力、芯片、基础模型和高效模型架构。",
	},
] as const;

export type GlossaryCategoryId = (typeof glossaryCategories)[number]["id"];
export type GlossaryTag = "通识" | "技术" | "产品" | "公司" | "商业";
export type GlossaryDepth = "card" | "core";
export type GlossaryStability = "stable" | "evolving" | "speculative";
export type GlossarySourceLevel = "primary" | "secondary" | "user-material";

export interface GlossaryTerm {
	term: string;
	zh: string;
	slug?: string;
	href?: string;
	aliases?: string[];
	summary: string;
	tag: GlossaryTag;
	category: GlossaryCategoryId;
	depth?: GlossaryDepth;
	hasDetailPage?: boolean;
	stability?: GlossaryStability;
	sourceLevel?: GlossarySourceLevel;
	beginnerExplanation: string;
	commonMisunderstanding: string;
	relatedTerms: string[];
}

export type GlossaryTermEntry = Omit<
	GlossaryTerm,
	"aliases" | "depth" | "hasDetailPage" | "href" | "slug" | "sourceLevel" | "stability"
> &
	Required<
		Pick<
			GlossaryTerm,
			"aliases" | "depth" | "hasDetailPage" | "href" | "slug" | "sourceLevel" | "stability"
		>
	>;

const glossarySlugOverrides: Record<string, string> = {
	Agents: "agent",
	"Diffusion Models": "diffusion-models",
	"Fine-Tuning": "fine-tuning",
	"Generative AI / Gen AI": "generative-ai",
	"Foundation Model": "foundation-model",
	"Machine Learning": "machine-learning",
	"Deep Learning": "deep-learning",
	"Prompt Engineering": "prompt-engineering",
};

const coreTermConfig: Record<
	string,
	{
		aliases?: string[];
		hasDetailPage?: boolean;
		stability?: GlossaryStability;
		sourceLevel?: GlossarySourceLevel;
	}
> = {
	AI: {
		aliases: ["Artificial Intelligence", "人工智能"],
		hasDetailPage: true,
		stability: "stable",
		sourceLevel: "primary",
	},
	AGI: {
		aliases: ["Artificial General Intelligence", "通用人工智能"],
		hasDetailPage: true,
		stability: "speculative",
		sourceLevel: "primary",
	},
	ASI: {
		aliases: ["Artificial Superintelligence", "人工超级智能"],
		hasDetailPage: true,
		stability: "speculative",
		sourceLevel: "primary",
	},
	"Machine Learning": { aliases: ["ML", "机器学习"], stability: "stable" },
	"Deep Learning": { aliases: ["DL", "深度学习"], stability: "stable" },
	LLM: {
		aliases: ["Large Language Model", "大语言模型"],
		hasDetailPage: true,
		stability: "evolving",
		sourceLevel: "primary",
	},
	Transformer: { aliases: ["Transformer 架构"], stability: "stable" },
	Token: { aliases: ["词元"], stability: "stable" },
	"Prompt Engineering": {
		aliases: ["提示工程"],
		stability: "evolving",
	},
	RAG: {
		aliases: ["Retrieval-Augmented Generation", "检索增强生成"],
		hasDetailPage: true,
		stability: "evolving",
		sourceLevel: "primary",
	},
	Embedding: { aliases: ["嵌入", "向量表示"], stability: "stable" },
	"Fine-Tuning": { aliases: ["微调"], stability: "evolving" },
	Agents: {
		aliases: ["AI Agent", "智能体"],
		hasDetailPage: true,
		stability: "evolving",
		sourceLevel: "primary",
	},
	"Generative AI / Gen AI": {
		aliases: ["生成式 AI", "Generative AI"],
		hasDetailPage: true,
		stability: "evolving",
	},
	"Diffusion Models": {
		aliases: ["扩散模型"],
		hasDetailPage: true,
		stability: "stable",
	},
	Alignment: {
		aliases: ["AI 对齐"],
		hasDetailPage: true,
		stability: "evolving",
		sourceLevel: "primary",
	},
	Hallucination: {
		aliases: ["幻觉", "Confabulation"],
		hasDetailPage: true,
		stability: "evolving",
		sourceLevel: "primary",
	},
	"Foundation Model": { aliases: ["基础模型"], stability: "evolving" },
	GPU: { aliases: ["图形处理器"], stability: "stable" },
	MoE: { aliases: ["Mixture of Experts", "专家混合"], stability: "evolving" },
};

function slugifyGlossaryTerm(term: string) {
	return (
		glossarySlugOverrides[term] ??
		term
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "")
	);
}

// Source note: the initial screenshot did not cover one row, so it is not included.
export const glossaryTerms = [
	{
		term: "AGI",
		zh: "通用人工智能",
		summary: "能在很多不同任务中学习、迁移和解决问题的人工智能目标。",
		tag: "通识",
		category: "fundamentals",
		beginnerExplanation:
			"AGI 不是某个单一产品名，而是对更通用智能能力的追求。它强调跨领域处理问题，而不只是完成某个固定任务。",
		commonMisunderstanding:
			"不要把会聊天的大模型直接等同于 AGI，行业里对 AGI 的标准仍有争议。",
		relatedTerms: ["AI", "ANI", "ASI", "LLM"],
	},
	{
		term: "AI",
		zh: "人工智能",
		summary: "让机器表现出识别、预测、生成、决策等智能行为的一大类技术。",
		tag: "通识",
		category: "fundamentals",
		beginnerExplanation:
			"AI 是最大的总称，推荐算法、图像识别、大语言模型和自动驾驶都可以放在这个范围里。不同 AI 的能力边界差异很大。",
		commonMisunderstanding:
			"AI 不是一个统一能力等级，不能因为一个系统会写文章，就推断它也能可靠做所有事情。",
		relatedTerms: ["ANI", "AGI", "Machine Learning", "Generative AI"],
	},
	{
		term: "AIGC",
		zh: "人工智能生成内容",
		summary: "用 AI 生成文本、图片、音频、视频、代码等内容的应用形态。",
		tag: "商业",
		category: "fundamentals",
		beginnerExplanation:
			"AIGC 更偏应用和产业语境，关注 AI 能产出什么内容，以及这些内容如何进入创作、营销、教育和办公流程。",
		commonMisunderstanding:
			"AIGC 不等于所有 AI，它只是 AI 在内容生成方向上的一个重要分支。",
		relatedTerms: ["Generative AI", "Diffusion Models", "ChatGPT", "GAN"],
	},
	{
		term: "ANI",
		zh: "狭义人工智能",
		summary: "擅长特定任务、但不具备通用智能的 AI。",
		tag: "通识",
		category: "fundamentals",
		beginnerExplanation:
			"今天大多数 AI 系统都更接近 ANI：它们可以在棋类、推荐、识别、生成等任务上很强，但能力通常受训练目标和使用场景限制。",
		commonMisunderstanding:
			"专门任务上的高水平表现，不代表系统拥有人的常识、目标和长期理解能力。",
		relatedTerms: ["AI", "AGI", "ASI"],
	},
	{
		term: "ASI",
		zh: "人工超级智能",
		summary: "在大量关键脑力任务上显著超过人类的未来 AI 设想。",
		tag: "通识",
		category: "fundamentals",
		beginnerExplanation:
			"ASI 主要出现在未来能力和风险治理讨论里。它不是当前已经公开公认实现的系统，而是帮助人们提前讨论极强 AI 的影响。",
		commonMisunderstanding:
			"不要把 ASI 当成已经上市的产品，也不要把所有风险讨论都当成确定预言。",
		relatedTerms: ["AGI", "Alignment", "Singularity", "Scaling Law"],
	},
	{
		term: "Accelerator",
		zh: "加速器",
		summary: "用来加快 AI 训练或推理的硬件设备或专用计算单元。",
		tag: "产品",
		category: "infrastructure",
		beginnerExplanation:
			"加速器这个词是大类，不特指某一家芯片。只要它的作用是让模型算得更快、更省能耗或更便宜，通常都能被放进 accelerator 的讨论里。",
		commonMisunderstanding:
			"加速器不是模型本身，也不是只等于 GPU；它说的是底层硬件如何支撑训练和推理效率。",
		relatedTerms: ["Compute", "GPU", "TPU", "MoE"],
	},
	{
		term: "Agents",
		zh: "智能体",
		summary: "围绕目标拆任务、调用工具并持续推进流程的 AI 系统。",
		tag: "技术",
		category: "agents-products",
		beginnerExplanation:
			"普通聊天机器人偏向问一句答一句，Agent 更像带工具箱的助手。它会把目标拆成步骤，必要时调用搜索、代码、文档或外部系统。",
		commonMisunderstanding:
			"Agent 不是自动等于可靠，越能执行动作越需要权限、日志和人工确认。",
		relatedTerms: ["Chatbot", "LLM", "Prompt Engineering", "RAG"],
	},
	{
		term: "Alignment",
		zh: "对齐",
		summary: "让 AI 的目标、行为和结果尽量符合人的真实意图与安全边界。",
		tag: "技术",
		category: "frontier",
		beginnerExplanation:
			"对齐不只是让模型回答得体，而是让系统在训练、工具调用和真实流程里都尽量朝人真正想要的方向工作。",
		commonMisunderstanding:
			"对齐不是单纯的敏感词过滤或礼貌包装；如果目标设计、权限边界或评估方式错了，系统仍然可能高效地把事情做歪。",
		relatedTerms: ["Hallucination", "RLHF", "Bias", "XAI"],
	},
	{
		term: "Attention",
		zh: "注意力",
		summary: "模型在处理输入时，为不同信息分配不同关注权重的机制。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"可以把 Attention 理解成模型在阅读一句话时，不会平均看待每个词，而是会根据当前任务判断现在最该看哪里。它帮助模型在长上下文里抓住重点，也是 Transformer 能高效处理语言和多种序列数据的关键机制之一。",
		commonMisunderstanding:
			"Attention 不是人的意识，也不表示模型真的理解了重点。它本质上是一种计算相关性、分配信息权重的方法。",
		relatedTerms: ["Transformer", "Token", "Inference", "Parameters"],
	},
	{
		term: "Backpropagation",
		zh: "反向传播",
		summary: "把输出误差从后往前传回网络各层，用来计算参数该如何调整的方法。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"训练时，模型先做一次前向计算，给出预测结果；再用损失函数衡量错了多少。反向传播会把这个错误信息沿着网络倒推回去，计算每一层参数分别该往哪个方向改、改多少。它本身不直接更新参数，而是为后续优化步骤提供依据。",
		commonMisunderstanding:
			"反向传播不等于模型在反思自己的错误。它是一个数学求导和误差分配过程，主要发生在训练阶段，不是日常使用模型时的过程。",
		relatedTerms: ["Loss Function", "Gradient Descent", "Forward Propagation", "Parameters"],
	},
	{
		term: "Bias",
		zh: "偏差",
		summary: "数据、模型或系统设计中使结果持续偏向某些群体、结论或判断方式的系统性倾向。",
		tag: "技术",
		category: "frontier",
		beginnerExplanation:
			"偏差常常不是一句冒犯的话，而是系统长期对某类人、某类输入或某种结论更有利或更不利。它可能来自数据分布、标注习惯、目标函数，也可能来自产品流程本身。",
		commonMisunderstanding:
			"偏差不只等于“政治不正确”。它既可能体现为不公平，也可能体现为统计误差、代表性不足和场景迁移失败。",
		relatedTerms: ["Alignment", "Hallucination", "Training Data", "XAI"],
	},
	{
		term: "CLIP",
		zh: "对比语言图像预训练",
		summary: "把文字和图像对齐到同一语义空间的视觉语言模型方法。",
		tag: "技术",
		category: "generative-multimodal",
		beginnerExplanation:
			"CLIP 会让模型同时看图和读字，并学会判断哪段文字更像在描述这张图。这样一来，模型就能把文字和图像放进同一个可比较的语义空间，进而支持图像检索、图像理解和文生图条件控制。",
		commonMisunderstanding:
			"CLIP 本身不负责把图片直接画出来，它更像文字和图像之间的对齐器，经常和扩散模型或其他视觉模型配合使用。",
		relatedTerms: ["Multimodal", "CV", "Embedding", "Diffusion Models"],
	},
	{
		term: "CNN",
		zh: "卷积神经网络",
		summary: "擅长提取局部图像特征、长期用于视觉任务的一类神经网络结构。",
		tag: "技术",
		category: "generative-multimodal",
		beginnerExplanation:
			"CNN 会用卷积核在图像上滑动，逐步抓住边缘、纹理、形状等局部线索。它曾长期是图像分类、目标检测等任务的主力结构，也帮助很多人第一次理解“模型怎么看图”。",
		commonMisunderstanding:
			"CNN 不是所有视觉 AI 的总代称，更不等于今天所有图像生成模型；不少新系统已经大量使用 Transformer 或扩散模型。",
		relatedTerms: ["CV", "Neural Network", "Deep Learning", "Transformer"],
	},
	{
		term: "CV",
		zh: "计算机视觉",
		summary: "让机器识别、理解、生成和处理图像或视频的 AI 方向。",
		tag: "技术",
		category: "generative-multimodal",
		beginnerExplanation:
			"计算机视觉研究的是机器怎么“看懂”视觉世界。它既包括识别这张图里有什么，也包括分割、追踪、三维重建，以及根据文字或图片继续生成新视觉内容。",
		commonMisunderstanding:
			"CV 不只等于拍照识别或人脸识别，它也覆盖视频理解、机器人感知、三维场景建模和生成式视觉。",
		relatedTerms: ["CNN", "CLIP", "NeRF", "Multimodal"],
	},
	{
		term: "ChatGPT",
		zh: "ChatGPT",
		summary: "OpenAI 推出的对话式 AI 产品，也是很多人接触大模型的入口。",
		tag: "产品",
		category: "agents-products",
		beginnerExplanation:
			"ChatGPT 是产品层的名字，不只是一个模型名。它把底层模型、对话界面、工具能力和安全策略包装成普通人能直接使用的聊天体验。",
		commonMisunderstanding:
			"ChatGPT 不等于整个 AI 行业，也不等于所有大语言模型；它是一个具体产品，而不是通用技术类别。",
		relatedTerms: ["LLM", "Chatbot", "Foundation Model", "OpenAI"],
	},
	{
		term: "Chatbot",
		zh: "聊天机器人",
		summary: "通过文字或语音与用户对话的程序或 AI 系统。",
		tag: "通识",
		category: "agents-products",
		beginnerExplanation:
			"Chatbot 说的是交互形式，不自动代表底层技术先进。它可以是老式规则客服，也可以是由大语言模型驱动、还能调用工具的现代对话系统。",
		commonMisunderstanding:
			"聊天机器人不等于大模型，更不等于智能体。能聊天只是入口，背后能力差距可能非常大。",
		relatedTerms: ["ChatGPT", "Agent", "LLM", "Foundation Model"],
	},
	{
		term: "CoT",
		zh: "思维链提示",
		summary: "用中间步骤提示模型进行更复杂推理的方法。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"CoT 的核心是让模型把问题拆开，逐步处理。它常被用于数学、逻辑、规划等需要多步推理的任务。",
		commonMisunderstanding:
			"模型写出的推理步骤不一定等于真实内部过程，仍需要校验答案。",
		relatedTerms: ["Prompt Engineering", "LLM", "Inference"],
	},
	{
		term: "Compute",
		zh: "计算",
		summary: "训练或运行 AI 模型所需的算力、时间、电力和系统资源。",
		tag: "技术",
		category: "infrastructure",
		beginnerExplanation:
			"在 AI 语境里，compute 不只是芯片数量，还包括机器运行多久、耗多少电、怎么调度。模型越大、并发越高，算力成本越会直接影响价格和速度。",
		commonMisunderstanding:
			"算力更强不自动等于产品更好；它解决的是能不能更快、更大规模地训练和运行，不替代数据质量、算法设计和产品体验。",
		relatedTerms: ["GPU", "TPU", "Accelerator", "Foundation Model", "MoE"],
	},
	{
		term: "Connectionism",
		zh: "联结主义",
		summary: "用大量连接和权重模拟学习能力的 AI 思路。",
		tag: "通识",
		category: "fundamentals",
		beginnerExplanation:
			"联结主义可以理解成让系统从数据中调整连接强度，而不是手写每条规则。今天的深度学习属于这个路线的重要代表。",
		commonMisunderstanding:
			"联结主义不是唯一 AI 路线，符号主义和混合方法也很重要。",
		relatedTerms: ["Neural Network", "Deep Learning", "Symbolic AI"],
	},
	{
		term: "Cross-modal generalization",
		zh: "跨模态泛化",
		summary: "模型把一种模态学到的能力迁移到另一种模态上的能力。",
		tag: "技术",
		category: "generative-multimodal",
		beginnerExplanation:
			"例如模型从文字和图片之间学到关联后，能更好处理看图问答或用文字找图。它是多模态 AI 的关键能力之一。",
		commonMisunderstanding:
			"跨模态泛化不是简单把不同数据拼在一起，而是要学到可迁移的表示。",
		relatedTerms: ["Multimodal", "CLIP", "Embedding"],
	},
	{
		term: "DPO",
		zh: "直接偏好优化",
		summary: "直接用偏好数据优化模型输出倾向的训练方法。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"DPO 常用于让模型更偏向人类喜欢的回答风格或质量。它绕开了部分传统强化学习流程，工程上更直接。",
		commonMisunderstanding:
			"DPO 不是安全的全部，它只能影响模型偏好，不能替代系统级治理。",
		relatedTerms: ["RLHF", "PPO", "Alignment"],
	},
	{
		term: "Data Augmentation",
		zh: "数据增强",
		summary: "通过改造现有样本增加训练数据多样性的方法。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"数据增强像是给模型多看同一类问题的不同变体。图像里可以翻转、裁剪、加噪声，文本里可以改写或扩展样本。",
		commonMisunderstanding:
			"数据增强不是凭空制造真实数据，低质量增强也可能把模型带偏。",
		relatedTerms: ["Training Data", "Overfitting", "Regularization"],
	},
	{
		term: "Deep Learning",
		zh: "深度学习",
		summary: "使用多层神经网络从数据中学习表示的机器学习分支。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"深度学习是机器学习里非常重要的一条路线。它通过多层神经网络，从原始数据中逐层学出更抽象、更适合任务的表示。",
		commonMisunderstanding:
			"深度学习不是机器学习的全部，也不是层数越多就一定越好。今天的大模型属于深度学习，但深度学习不只等于大模型。",
		relatedTerms: ["Machine Learning", "Neural Network", "CNN", "Transformer"],
	},
	{
		term: "DeepMind",
		zh: "DeepMind 公司",
		summary: "以 AI 研究和应用闻名的人工智能公司。",
		tag: "公司",
		category: "agents-products",
		beginnerExplanation:
			"DeepMind 因 AlphaGo 等成果被大众熟知，也长期参与强化学习、蛋白质结构预测和基础模型研究。",
		commonMisunderstanding:
			"公司名不是技术名，讨论具体能力时仍要回到模型、论文或产品。",
		relatedTerms: ["Reinforcement Learning", "OpenAI", "AlphaGo"],
	},
	{
		term: "Diffusion Models",
		zh: "扩散模型",
		summary: "通过学习逐步去噪过程来生成图像等内容的一类生成模型。",
		tag: "技术",
		category: "generative-multimodal",
		beginnerExplanation:
			"扩散模型可以粗略理解为先把目标内容想成一团噪声，再让模型一步步把噪声整理成清晰图像。今天很多文生图、图生图和视频生成系统，都把它当作核心生成方法。",
		commonMisunderstanding:
			"扩散模型不只是“把图画得更漂亮”的技巧，它还牵涉采样速度、条件控制、训练数据来源和生成结果版权等现实问题。",
		relatedTerms: ["Generative AI", "GAN", "CLIP", "Multimodal"],
	},
	{
		term: "Double Descent",
		zh: "双降",
		summary: "测试误差随模型规模、训练时长或数据规模变化时，可能先变好、再变差、最后又继续变好的现象。",
		tag: "技术",
		category: "frontier",
		beginnerExplanation:
			"双降提醒我们：现代模型不是越复杂越容易一直变差。某些情况下，它会先进入看似过拟合的糟糕区间，继续扩大后反而又恢复更好的泛化表现。",
		commonMisunderstanding:
			"双降不是“越大越无脑更强”的口号，它只说明误差曲线可能不是传统教材里那条简单 U 形线。",
		relatedTerms: ["Generalization ability", "Overfitting", "Scaling Law", "Emergence"],
	},
	{
		term: "Embedding",
		zh: "嵌入",
		summary: "把文本、图像等对象转换成向量表示的方法。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"Embedding 像是给内容生成一个可计算的位置。意思相近的内容会在向量空间里更接近，所以它常用于搜索、推荐和 RAG。",
		commonMisunderstanding:
			"Embedding 不是把内容原文保存下来，而是保存便于比较的数学表示。",
		relatedTerms: ["Vector", "Vector Database", "RAG"],
	},
	{
		term: "Emergence",
		zh: "涌现",
		summary: "模型规模、训练方式或系统复杂度跨过某个阈值后，突然表现出先前不明显的新能力或行为。",
		tag: "技术",
		category: "frontier",
		beginnerExplanation:
			"涌现常用来描述“小模型看不出来，大模型突然会了”的现象。它提醒我们，能力增长不一定总是平滑线性上升。",
		commonMisunderstanding:
			"涌现不是神秘主义标签，也不自动说明能力可靠；很多所谓涌现现象仍然可能和评测方式、任务阈值或提示设计有关。",
		relatedTerms: ["Scaling Law", "Double Descent", "Generalization ability", "LLM"],
	},
	{
		term: "End-to-End Learning",
		zh: "端到端学习",
		summary: "直接从原始输入学习到目标输出的机器学习方式。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"端到端学习减少了手工设计中间步骤，让模型自己从输入到输出学映射。语音识别、自动驾驶和翻译里都常讨论它。",
		commonMisunderstanding:
			"端到端不等于没有工程设计，数据、目标、评估和系统边界仍然很重要。",
		relatedTerms: ["Machine Learning", "Training Data", "Deep Learning"],
	},
	{
		term: "Expert Systems",
		zh: "专家系统",
		summary: "用规则和知识库解决特定领域问题的早期 AI 系统。",
		tag: "技术",
		category: "agents-products",
		beginnerExplanation:
			"专家系统更像把专家经验写成规则，再让计算机推理。它代表了符号主义 AI 的一类经典应用。",
		commonMisunderstanding:
			"专家系统不是大语言模型，它通常依赖显式规则而不是从海量数据中学习。",
		relatedTerms: ["Symbolic AI", "AI", "Chatbot"],
	},
	{
		term: "Few-Shot",
		zh: "小样本学习",
		summary: "用少量示例帮助模型完成新任务的学习或提示方式。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"Few-Shot 可以出现在训练里，也可以出现在提示词里。给模型几个例子，通常能让它更清楚输出格式和判断标准。",
		commonMisunderstanding:
			"少量样本不代表一定可靠，任务复杂时仍需要更多数据或验证。",
		relatedTerms: ["Zero-Shot", "Prompt Engineering", "Transfer Learning"],
	},
	{
		term: "Fine-Tuning",
		zh: "微调",
		summary: "在已有模型基础上用特定数据继续训练，让它适配任务或风格。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"微调像是在通用模型上继续训练一段，让它更熟悉某个领域、格式或任务。它常用于垂直场景和企业内部模型。",
		commonMisunderstanding:
			"不是所有问题都需要微调，很多知识更新和问答场景用 RAG 更合适。",
		relatedTerms: ["Pre-training", "Instruction Tuning", "SFT"],
	},
	{
		term: "Fitting",
		zh: "拟合",
		summary: "模型学习数据规律并尽量匹配真实输出的过程。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"拟合就是让模型的预测越来越接近训练数据里的答案。好的拟合要抓住规律，而不是记住偶然噪声。",
		commonMisunderstanding:
			"拟合越好不一定越能泛化，过拟合会让模型在新数据上表现变差。",
		relatedTerms: ["Overfitting", "Underfitting", "Loss Function"],
	},
	{
		term: "Forward Propagation",
		zh: "前向传播",
		summary: "输入数据经过神经网络各层得到输出的计算过程。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"前向传播就是模型从输入算到输出的过程。训练时先前向得到预测，再用反向传播更新参数。",
		commonMisunderstanding:
			"前向传播不是训练的全部，它只负责产生输出，参数更新还需要反向传播和优化器。",
		relatedTerms: ["Backpropagation", "Neural Network", "Inference"],
	},
	{
		term: "Foundation Model",
		zh: "基础模型",
		summary: "先在广泛数据上预训练、再被适配到多种任务的模型底座。",
		tag: "技术",
		category: "infrastructure",
		beginnerExplanation:
			"基础模型像 AI 时代的通用底座。它先学一遍通用模式，再通过提示、检索、微调或工具调用进入不同应用，所以聊天助手、企业问答和代码工具可能共用同一类底层能力。",
		commonMisunderstanding:
			"基础模型不是最终产品本身，也不只等于聊天机器人；真正可用的产品还要叠加数据、工程、安全和交互设计。",
		relatedTerms: ["LLM", "Transformer", "Fine-Tuning", "RAG", "MoE"],
	},
	{
		term: "GAN",
		zh: "生成对抗网络",
		summary: "让生成器和判别器相互博弈来生成新数据的一类生成模型方法。",
		tag: "技术",
		category: "generative-multimodal",
		beginnerExplanation:
			"GAN 可以理解成一个模型负责造，一个模型负责挑错。生成器想骗过判别器，判别器想识破生成器；两边反复对抗，最后能产出越来越像真的图片、音频或其他数据。",
		commonMisunderstanding:
			"GAN 不是所有生成式 AI 的共同底座。它在生成式视觉历史上很重要，但今天很多主流图像系统已经更多转向扩散模型。",
		relatedTerms: ["Diffusion Models", "Generative AI", "Neural Network", "AIGC"],
	},
	{
		term: "GPT-4",
		zh: "GPT-4",
		summary: "OpenAI 发布的一代大语言模型名称。",
		tag: "产品",
		category: "agents-products",
		beginnerExplanation:
			"GPT-4 是一个具体模型代际名，常被用于讨论更强的文本和多模态能力。使用时要区分模型、产品和 API。",
		commonMisunderstanding:
			"GPT-4 不是所有 ChatGPT，也不是所有大语言模型的统称。",
		relatedTerms: ["ChatGPT", "OpenAI", "LLM"],
	},
	{
		term: "GPU",
		zh: "图形处理单元",
		summary: "擅长并行计算、因此成为 AI 训练和推理主力的通用加速芯片。",
		tag: "产品",
		category: "infrastructure",
		beginnerExplanation:
			"GPU 最早主要服务图形渲染，但它一次能处理很多并行计算任务，这正好适合神经网络。今天大家谈 AI 算力，很多时候说的核心就是 GPU 资源够不够。",
		commonMisunderstanding:
			"GPU 不只是游戏显卡。放进数据中心后，它讨论的是训练速度、推理吞吐和成本，而不是画面帧率。",
		relatedTerms: ["Compute", "Accelerator", "TPU", "Foundation Model"],
	},
	{
		term: "GQA",
		zh: "图问答",
		summary: "基于图结构或图数据进行问题回答的技术方向。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"GQA 关注的是当知识以图结构连接时，模型如何理解节点、关系和路径，并据此回答问题。",
		commonMisunderstanding:
			"GQA 不是普通的文本问答，它依赖图结构中的关系信息。",
		relatedTerms: ["RAG", "Vector Database", "NLP"],
	},
	{
		term: "GPO",
		zh: "广义策略优化",
		summary: "用于改进策略学习效率的一类优化思路。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"GPO 可以放在策略优化和偏好训练的大框架里理解。普通读者只需要知道它和让模型选择更好行为有关。",
		commonMisunderstanding:
			"GPO 不是通用提速按钮，具体效果依赖训练目标、数据和实现方式。",
		relatedTerms: ["PPO", "RLHF", "Reinforcement Learning"],
	},
	{
		term: "Generalization ability",
		zh: "泛化能力",
		summary: "模型把训练中学到的规律带到新数据、新任务或新场景里仍能有效工作的能力。",
		tag: "技术",
		category: "frontier",
		beginnerExplanation:
			"泛化能力强，说明模型学到的不是死记训练样本，而是更可迁移的规律。它决定模型离开实验环境后还能不能靠谱。",
		commonMisunderstanding:
			"训练集分数高不等于泛化好；只有在验证集、测试集甚至真实世界里还能稳定表现，才说明它真的学会了。",
		relatedTerms: ["Overfitting", "Validation Data", "Double Descent", "Scaling Law"],
	},
	{
		term: "Generalize",
		zh: "广义化",
		summary: "把具体概念扩展到更大范围或更一般形式的过程。",
		tag: "通识",
		category: "fundamentals",
		beginnerExplanation:
			"广义化可以理解成从具体例子抽出更通用的说法。在 AI 语境里，它和模型能不能迁移规律有关。",
		commonMisunderstanding:
			"广义化不是随意扩大概念范围，必须保留关键边界。",
		relatedTerms: ["Generalization ability", "Machine Learning"],
	},
	{
		term: "Generative AI / Gen AI",
		zh: "生成式 AI",
		summary: "专注于生成新文本、图像、音频、视频或代码等内容的 AI 分支。",
		tag: "通识",
		category: "fundamentals",
		beginnerExplanation:
			"生成式 AI 关心的是模型如何产出新内容，而不只是做判断、分类或推荐。ChatGPT、AI 绘画、语音克隆和视频生成，都是普通人最常见的入口。",
		commonMisunderstanding:
			"生成式 AI 不等于内容一定真实，也不等于只有聊天机器人；它是一个覆盖文本、图像、音频、视频和代码生成的大类。",
		relatedTerms: ["AIGC", "Diffusion Models", "LLM", "Multimodal"],
	},
	{
		term: "Gradient Descent",
		zh: "梯度下降",
		summary: "根据损失变化方向，一步步调整参数以减少错误的优化方法。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"如果把损失函数想成一片高低起伏的地形，梯度下降就是模型沿着往下走的方向不断试探，让自己从更高的错误位置走向更低的错误位置。每一步走多大、往哪边走，都会影响训练速度和稳定性。",
		commonMisunderstanding:
			"梯度下降不是一下子找到最优答案的魔法方法。它通常只能不断改进，而且结果会受到学习率、初始化、数据分布和优化细节影响。",
		relatedTerms: ["Loss Function", "Backpropagation", "Parameters", "Learning Rate"],
	},
	{
		term: "Hallucination",
		zh: "幻觉",
		summary: "模型生成了听起来可信、但并不被事实、来源或输入依据支持的内容。",
		tag: "技术",
		category: "frontier",
		beginnerExplanation:
			"幻觉最麻烦的地方，不是它乱说，而是它会把编造的引用、数字或细节说得特别顺。用户如果只看语气，很容易被带偏。",
		commonMisunderstanding:
			"幻觉不等于模型有意撒谎；很多时候它是在证据不足时仍继续“补全像答案的东西”。",
		relatedTerms: ["Alignment", "RAG", "Bias", "XAI"],
	},
	{
		term: "Hidden Layer",
		zh: "隐藏层",
		summary: "神经网络中位于输入层和输出层之间的计算层。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"隐藏层负责把输入逐步转换成更有用的内部表示。深度学习中的“深”通常和隐藏层数量有关。",
		commonMisunderstanding:
			"隐藏层不是不可研究的神秘空间，只是用户不直接输入或读取的中间计算层。",
		relatedTerms: ["Neural Network", "Forward Propagation", "Latent Space"],
	},
	{
		term: "Hyperparameter Tuning",
		zh: "超参数调优",
		summary: "选择学习率、层数等训练前配置值的过程。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"超参数不是模型从数据里自动学出的权重，而是训练前或训练中由人和系统配置的选项。调优会影响速度、稳定性和效果。",
		commonMisunderstanding:
			"调超参数不是玄学试运气，应该结合验证集、实验记录和目标指标。",
		relatedTerms: ["Validation Data", "Parameters", "Gradient Descent"],
	},
	{
		term: "Inference",
		zh: "推理",
		summary: "把训练好的模型用于新输入，生成预测、判断或回答的过程。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"推理可以理解成模型正式上岗。训练阶段是在调整参数、学会模式；推理阶段则是把已经学到的能力拿来处理新问题。你问聊天机器人一个问题、让图像模型识别照片内容，或者让推荐系统给出结果，本质上都属于推理。",
		commonMisunderstanding:
			"推理在工程语境里不一定指复杂逻辑思考，它更多是指模型运行并产出结果。即使输出看起来像思考，底层仍是在调用已训练好的参数做计算。",
		relatedTerms: ["Forward Propagation", "LLM", "Attention", "Parameters"],
	},
	{
		term: "Instruction Tuning",
		zh: "指令调优",
		summary: "用指令和答案数据训练模型，让它更会按要求完成任务。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"指令调优让模型更懂“请总结”“请翻译”“按这个格式输出”等用户意图。它是把基础模型变成可用助手的重要步骤。",
		commonMisunderstanding:
			"指令调优不是给模型临时写提示词，而是训练阶段的适配。",
		relatedTerms: ["Fine-Tuning", "SFT", "Prompt Engineering"],
	},
	{
		term: "KTO",
		zh: "知识迁移优化",
		summary: "用偏好或迁移信号提升模型在新任务上表现的优化思路。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"KTO 可放在模型对齐和偏好优化家族里理解。普通读者只需知道它试图让模型更好利用反馈，改善输出选择。",
		commonMisunderstanding:
			"KTO 不是知识库，也不是直接把资料塞给模型。",
		relatedTerms: ["DPO", "RLHF", "Transfer Learning"],
	},
	{
		term: "Knowledge Distillation",
		zh: "知识蒸馏",
		summary: "让小模型学习大模型行为，以降低部署成本的方法。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"知识蒸馏像让学生模型模仿老师模型。它常用于模型压缩、边缘部署和降低推理成本。",
		commonMisunderstanding:
			"蒸馏不等于完整复制大模型能力，小模型仍会受容量和训练数据限制。",
		relatedTerms: ["Pruning", "Foundation Model", "Inference"],
	},
	{
		term: "LLM",
		zh: "大语言模型",
		summary: "用大量文本和参数训练、擅长语言处理与生成的模型。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"LLM 是 ChatGPT 等产品背后的关键模型类型。它通过预测和生成文本来完成写作、问答、总结、翻译和代码等任务。",
		commonMisunderstanding:
			"LLM 不是知识库本身，回答可能受训练数据、上下文和生成机制影响。",
		relatedTerms: ["Transformer", "Token", "ChatGPT"],
	},
	{
		term: "LSTM",
		zh: "长短期记忆",
		summary: "一种适合处理序列数据的循环神经网络结构。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"LSTM 通过门控机制缓解普通 RNN 难以记住长距离信息的问题。它曾广泛用于语音、文本和时间序列任务。",
		commonMisunderstanding:
			"LSTM 不是大语言模型的主流底座，现代 LLM 主要依赖 Transformer。",
		relatedTerms: ["RNN", "Transformer", "NLP"],
	},
	{
		term: "Latent Space",
		zh: "潜在空间",
		summary: "模型内部用于表示数据特征的压缩空间。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"潜在空间可以理解成模型整理出来的抽象坐标系。相似对象在这个空间里通常更接近，生成模型也常在这里进行变化和控制。",
		commonMisunderstanding:
			"潜在空间不是现实中的物理空间，而是模型内部表示。",
		relatedTerms: ["Embedding", "Vector", "Diffusion Models"],
	},
	{
		term: "Loss Function",
		zh: "损失函数",
		summary: "衡量模型当前输出离目标答案有多远的函数。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"损失函数像训练时的扣分规则。模型先给出一个答案，再由损失函数计算这个答案和正确结果差多少。差得越多，损失越大；差得越少，损失越小。训练的一个核心目标，就是让损失逐步下降。",
		commonMisunderstanding:
			"损失函数不是对模型好坏的唯一最终评价。训练损失变小，说明模型更贴合训练目标，但不一定代表它在真实场景里一定更有用、更公平或更可靠。",
		relatedTerms: ["Gradient Descent", "Backpropagation", "Objective Function", "Parameters"],
	},
	{
		term: "MHA",
		zh: "多头注意力",
		summary: "让模型从多个角度同时关注输入信息的注意力机制。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"多头注意力可以让模型并行捕捉不同关系，比如语法、指代、局部和全局信息。它是 Transformer 的核心组成之一。",
		commonMisunderstanding:
			"多个头不等于多个独立模型，而是同一结构里的多组注意力计算。",
		relatedTerms: ["Attention", "Transformer", "Token"],
	},
	{
		term: "MLA",
		zh: "元学习算法",
		summary: "关注如何让模型更快学会新任务的学习算法方向。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"元学习常被概括为“学会如何学习”。它希望模型在遇到新任务时，用更少数据和更少步骤适配。",
		commonMisunderstanding:
			"元学习不是让模型拥有人的自我学习意识，而是训练策略上的设计。",
		relatedTerms: ["Few-Shot", "Transfer Learning", "Machine Learning"],
	},
	{
		term: "Machine Learning",
		zh: "机器学习",
		summary: "让模型从数据中学习规律并用于预测或决策的 AI 分支。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"机器学习不是把规则一条条写死，而是给系统数据和目标，让它从样本里学出可用模式。深度学习是机器学习里最重要的一条路线之一。",
		commonMisunderstanding:
			"机器学习不是所有 AI 的同义词，也不是数据越多越自然正确。真正关键的是数据质量、训练方式和模型能否泛化。",
		relatedTerms: ["AI", "Deep Learning", "Training Data", "Validation Data", "Supervised Learning"],
	},
	{
		term: "Mixture of Experts",
		zh: "专家组合",
		summary: "用多个专家子模型协作完成预测的模型方法。",
		tag: "技术",
		category: "infrastructure",
		beginnerExplanation:
			"专家组合会让不同子模型处理不同类型的信息或任务。这样可以在模型规模和计算成本之间寻找平衡。",
		commonMisunderstanding:
			"专家不是人类专家，而是模型内部的子网络或模块。",
		relatedTerms: ["MoE", "Foundation Model", "Compute"],
	},
	{
		term: "MoE",
		zh: "专家混合模型",
		summary: "把很多专家模块放进模型里，但每次只激活少数几个的稀疏架构。",
		tag: "技术",
		category: "infrastructure",
		beginnerExplanation:
			"MoE 像先分诊再找专家：模型内部有很多参数模块，但输入进来后只会挑少数模块参与计算。这样可以把总参数做大，同时不必每次都全量运行。",
		commonMisunderstanding:
			"MoE 不是把几个独立模型简单拼起来，也不代表每次推理都会调用全部参数；它的关键是路由和稀疏激活。",
		relatedTerms: ["Foundation Model", "Transformer", "Compute", "Parameters"],
	},
	{
		term: "Multimodal",
		zh: "多模态",
		summary: "能联合处理文本、图像、音频、视频等多种数据类型的 AI 能力。",
		tag: "技术",
		category: "generative-multimodal",
		beginnerExplanation:
			"多模态模型能把不同类型的信息放在一起理解和生成，例如看图回答、听语音转文字、根据文字生成图片，或者同时看文档和截图给出解释。",
		commonMisunderstanding:
			"多模态不是简单把几个功能菜单拼在一起，关键在于不同模态之间能相互对齐、共同推理，必要时还能彼此转换。",
		relatedTerms: ["CLIP", "CV", "Generative AI", "Cross-modal generalization"],
	},
	{
		term: "NLP",
		zh: "自然语言处理",
		summary: "研究机器如何处理、理解和生成自然语言的领域。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"NLP 包括分词、分类、翻译、问答、摘要和对话等任务。大语言模型是 NLP 发展中的重要阶段。",
		commonMisunderstanding:
			"NLP 不只等于聊天，也包括搜索、信息抽取、文本分类等大量基础任务。",
		relatedTerms: ["LLM", "Transformer", "Token"],
	},
	{
		term: "NeRF",
		zh: "神经辐射场",
		summary: "用神经网络从二维图像学习并渲染三维场景表示的方法。",
		tag: "技术",
		category: "generative-multimodal",
		beginnerExplanation:
			"NeRF 可以从多个视角图像学习一个场景的三维表示，再渲染出新的视角画面。它常出现在 3D 重建、数字孪生、沉浸式内容和视觉合成讨论里。",
		commonMisunderstanding:
			"NeRF 不是普通滤镜或修图模型，它处理的是场景表示、几何信息和视角渲染，和纯 2D 文生图不是一回事。",
		relatedTerms: ["CV", "Multimodal", "Diffusion Models", "Generative AI"],
	},
	{
		term: "Neural Network",
		zh: "神经网络",
		summary: "由多层计算单元和连接权重组成的机器学习模型。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"神经网络通过层与层之间的权重把输入逐步转换成输出。训练时，模型会不断调整这些权重，让自己在样本上学出更有用的映射关系。",
		commonMisunderstanding:
			"神经网络只是受大脑启发，不等于真实复刻人脑。它本质上是可训练的数学模型，而不是电子大脑。",
		relatedTerms: ["Deep Learning", "Hidden Layer", "Weight", "Machine Learning"],
	},
	{
		term: "Objective Function",
		zh: "目标函数",
		summary: "模型训练或优化时希望最大化或最小化的目标。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"目标函数告诉系统到底在优化什么。损失函数通常是目标函数的一种具体形式，用来衡量错得多不多。",
		commonMisunderstanding:
			"目标函数设计不当会让模型学会错误行为，所以目标本身也需要审查。",
		relatedTerms: ["Loss Function", "Gradient Descent", "Alignment"],
	},
	{
		term: "OpenAI",
		zh: "OpenAI 公司",
		summary: "以大语言模型和 AI 产品闻名的人工智能研究与产品公司。",
		tag: "公司",
		category: "agents-products",
		beginnerExplanation:
			"OpenAI 是 ChatGPT、GPT 系列模型和相关 API 的重要提供方之一。讨论它时要区分公司、模型、产品和接口。",
		commonMisunderstanding:
			"OpenAI 不是 AI 的同义词，AI 生态里还有许多研究机构、公司和开源社区。",
		relatedTerms: ["ChatGPT", "GPT-4", "LLM"],
	},
	{
		term: "Overfitting",
		zh: "过拟合",
		summary: "模型过度记住训练数据，导致新数据表现变差的问题。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"过拟合像考试只背原题，换个题就不会。模型在训练集上很好，但到了真实场景可能出错。",
		commonMisunderstanding:
			"训练准确率高不一定是好消息，要看验证集和真实数据表现。",
		relatedTerms: ["Fitting", "Regularization", "Validation Data"],
	},
	{
		term: "PPO",
		zh: "近端策略优化",
		summary: "强化学习中常用的一类策略优化算法。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"PPO 常出现在 RLHF 训练流程讨论中，用来让模型在优化奖励的同时避免策略变化过猛。",
		commonMisunderstanding:
			"PPO 不是大模型唯一训练方法，也不是普通用户写提示词会直接接触的东西。",
		relatedTerms: ["RLHF", "Reinforcement Learning", "DPO"],
	},
	{
		term: "Paradigm",
		zh: "范式",
		summary: "某个领域里被广泛采用的基本思路、框架或工作方式。",
		tag: "商业",
		category: "frontier",
		beginnerExplanation:
			"谈 AI 范式时，通常是在说行业从规则系统、机器学习、深度学习到大模型的工作方式变化。",
		commonMisunderstanding:
			"范式不是流行词包装，它应该指一套真正改变问题处理方式的框架。",
		relatedTerms: ["AI", "Machine Learning", "Foundation Model"],
	},
	{
		term: "Parameters",
		zh: "参数",
		summary: "模型在训练过程中学出来、决定其行为的内部数值。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"参数可以理解成模型记住经验的方式。训练时，模型会不断调整这些内部数值，让输出更接近目标答案。神经网络里的权重和偏置都属于参数。参数不是模型看到的原文知识清单，而是模型把大量样本压缩后形成的一套内部表示。",
		commonMisunderstanding:
			"参数多不等于一定更聪明。参数规模只说明模型容量更大，效果还取决于数据质量、训练方法、架构设计和推理方式。",
		relatedTerms: ["Weight", "Gradient Descent", "Backpropagation", "Inference"],
	},
	{
		term: "Pre-training",
		zh: "预训练",
		summary: "在大规模数据上先训练模型，让它获得通用能力的阶段。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"预训练像先打基础。模型先从大量数据中学语言、图像或世界模式，再通过微调、指令调优或检索进入具体应用。",
		commonMisunderstanding:
			"预训练不是最终产品，后续还需要对齐、评估和部署。",
		relatedTerms: ["Foundation Model", "Fine-Tuning", "LLM"],
	},
	{
		term: "Prompt Engineering",
		zh: "提示工程",
		summary: "设计输入指令和上下文，让模型更稳定完成任务的方法。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"提示工程不是写神秘咒语，而是把任务、背景、格式、约束和示例交代清楚，让模型更容易按要求输出。",
		commonMisunderstanding:
			"提示词不能解决所有问题，知识缺口、权限、数据质量和模型能力仍然会限制结果。",
		relatedTerms: ["CoT", "Few-Shot", "Instruction Tuning"],
	},
	{
		term: "Pruning",
		zh: "裁剪",
		summary: "删除模型中不重要的参数或结构，以降低计算成本的方法。",
		tag: "技术",
		category: "infrastructure",
		beginnerExplanation:
			"裁剪像给模型瘦身。它试图减少冗余参数，让模型更快、更小、更容易部署。",
		commonMisunderstanding:
			"裁剪不是随便删除，过度裁剪会明显损害模型质量。",
		relatedTerms: ["Knowledge Distillation", "Parameters", "Inference"],
	},
	{
		term: "RAG",
		zh: "检索增强生成",
		summary: "先检索资料，再让生成模型基于资料回答的方法。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"RAG 常用于企业知识库、文档问答和客服。它让模型在回答前先拿到相关资料，从而降低乱编和知识过期问题。",
		commonMisunderstanding:
			"RAG 不能自动保证答案正确，检索质量、资料质量和引用方式都很关键。",
		relatedTerms: ["Embedding", "Vector Database", "Hallucination"],
	},
	{
		term: "RLHF",
		zh: "基于人类反馈的强化学习",
		summary: "用人类偏好反馈训练奖励模型或调整模型行为的方法。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"RLHF 让模型更贴近人类偏好的回答方式。它常用于把基础模型调成更有帮助、更可控的助手。",
		commonMisunderstanding:
			"RLHF 不等于让模型拥有价值观，它只是把特定反馈转成训练信号。",
		relatedTerms: ["PPO", "DPO", "Alignment"],
	},
	{
		term: "RNN",
		zh: "循环神经网络",
		summary: "适合处理序列数据的一类神经网络。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"RNN 会把前一步的信息带到下一步，适合文本、语音和时间序列。后来 LSTM 改进了它处理长距离依赖的能力。",
		commonMisunderstanding:
			"RNN 不是今天大语言模型的主流结构，Transformer 已成为更常见的基础。",
		relatedTerms: ["LSTM", "Transformer", "NLP"],
	},
	{
		term: "Regularization",
		zh: "正则化",
		summary: "通过约束模型复杂度来降低过拟合风险的方法。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"正则化像给模型加规矩，让它不要过度依赖训练数据中的细枝末节。它常用于提升泛化能力。",
		commonMisunderstanding:
			"正则化不是越强越好，过强会导致模型学不到足够规律。",
		relatedTerms: ["Overfitting", "Generalization ability", "Data Augmentation"],
	},
	{
		term: "Reinforcement Learning",
		zh: "强化学习",
		summary: "让智能体通过行动和奖励学习策略的机器学习方法。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"强化学习不是直接看标准答案，而是在环境里不断行动，通过奖励信号慢慢学出更好的策略。游戏、机器人控制和偏好优化里都会用到它。",
		commonMisunderstanding:
			"强化学习不是奖励越多越简单，奖励设计错误会诱导模型学出看起来聪明但目标跑偏的行为。",
		relatedTerms: ["PPO", "RLHF", "Agents", "Machine Learning"],
	},
	{
		term: "SFT",
		zh: "监督微调",
		summary: "用人工整理的指令和答案对模型进行监督训练的阶段。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"SFT 常用于让基础模型先学会按指令回答。它通常发生在预训练之后、偏好优化之前或旁边。",
		commonMisunderstanding:
			"SFT 不是所有微调的同义词，它特指监督数据驱动的指令适配。",
		relatedTerms: ["Fine-Tuning", "Instruction Tuning", "RLHF"],
	},
	{
		term: "Scaling Law",
		zh: "规模定律",
		summary: "描述模型性能如何随参数量、数据量和训练算力扩大而变化的经验规律。",
		tag: "技术",
		category: "frontier",
		beginnerExplanation:
			"规模定律像一份经验地图：继续加模型、加数据、加算力，通常还能涨多少表现，值不值得继续烧资源。大模型时代很多训练预算就是按这个思路估算的。",
		commonMisunderstanding:
			"规模定律不是无限灵药。它描述的是常见趋势，不保证任何模型只要变大就一定更便宜、更可靠或更好用。",
		relatedTerms: ["Compute", "Parameters", "Emergence", "Generalization ability"],
	},
	{
		term: "Singularity",
		zh: "奇点",
		summary: "一种关于技术增长失控或不可预测转折点的未来设想。",
		tag: "技术",
		category: "fundamentals",
		beginnerExplanation:
			"AI 奇点常用于讨论当智能系统自我改进或能力增长超过人类理解时，社会可能进入难以预测的新阶段。",
		commonMisunderstanding:
			"奇点不是已发生事实，也不是有确定日期的事件。",
		relatedTerms: ["ASI", "AGI", "Alignment"],
	},
	{
		term: "Supervised Learning",
		zh: "监督学习",
		summary: "用带标签的数据训练模型预测正确输出的机器学习方法。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"监督学习就像给模型看题目和标准答案。分类、回归、识别等任务都常用这种方式训练，是很多入门机器学习任务最常见的方法。",
		commonMisunderstanding:
			"监督学习依赖标注质量，标签错了或偏了，模型也会跟着学偏。它也不等于所有机器学习。",
		relatedTerms: ["Training Data", "Validation Data", "SFT", "Machine Learning"],
	},
	{
		term: "Symbolic AI",
		zh: "符号主义",
		summary: "用显式符号、规则和逻辑推理构建智能系统的 AI 路线。",
		tag: "通识",
		category: "fundamentals",
		beginnerExplanation:
			"符号主义强调知识和推理可以用规则表达。专家系统就是典型例子，它和从数据中学习的联结主义形成对照。",
		commonMisunderstanding:
			"符号主义不是过时无用，现代 AI 仍会在工具、知识图谱和推理系统中使用符号方法。",
		relatedTerms: ["Connectionism", "Expert Systems", "AI"],
	},
	{
		term: "System1/System2",
		zh: "系统 1 / 系统 2",
		summary: "把快速直觉与慢速理性区分开的思考框架。",
		tag: "通识",
		category: "fundamentals",
		beginnerExplanation:
			"系统 1 常指快速、自动、直觉式判断，系统 2 常指慢速、费力、理性分析。AI 讨论里常借它解释快速生成和深度推理的差异。",
		commonMisunderstanding:
			"这不是严格的脑区划分，也不能简单套成模型真的拥有两套人类思维系统。",
		relatedTerms: ["CoT", "Inference", "Reasoning"],
	},
	{
		term: "TPU",
		zh: "张量处理单元",
		summary: "面向机器学习张量计算优化的专用 AI 加速芯片。",
		tag: "技术",
		category: "infrastructure",
		beginnerExplanation:
			"TPU 可以理解成为机器学习场景专门设计的一类芯片。它强调张量计算效率，代表了 AI 发展中“专用硬件越来越重要”的趋势。",
		commonMisunderstanding:
			"TPU 不是 GPU 的简单别名。两者都能服务 AI，但设计目标、配套生态和使用场景并不完全一样。",
		relatedTerms: ["GPU", "Accelerator", "Compute", "Foundation Model"],
	},
	{
		term: "TensorFlow",
		zh: "TensorFlow",
		summary: "用于构建和训练机器学习模型的开源框架。",
		tag: "技术",
		category: "agents-products",
		beginnerExplanation:
			"TensorFlow 是工程工具，不是模型本身。开发者可以用它搭建、训练和部署机器学习模型。",
		commonMisunderstanding:
			"框架不决定模型一定先进，关键还在数据、架构、训练和工程实践。",
		relatedTerms: ["Machine Learning", "Neural Network", "Training Data"],
	},
	{
		term: "Token",
		zh: "词元",
		summary: "语言模型处理文本时使用的基本计算单位。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"Token 可能是一个字、一个词或词的一部分。模型按 Token 计算输入输出，所以上下文长度和费用常和 Token 数有关。",
		commonMisunderstanding:
			"Token 不完全等于汉字或英文单词，不同分词器的切分方式也不同。",
		relatedTerms: ["LLM", "Transformer", "Prompt Engineering"],
	},
	{
		term: "Training Data",
		zh: "训练数据",
		summary: "用于训练模型、让模型学习规律的数据集合。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"训练数据决定模型能看到什么世界。模型从这些数据里学模式，所以数据的质量、覆盖范围和偏差，会直接影响模型输出。",
		commonMisunderstanding:
			"数据多不等于数据好，重复、污染、偏差和标签质量问题都会直接影响模型。",
		relatedTerms: ["Validation Data", "Bias", "Supervised Learning", "Machine Learning"],
	},
	{
		term: "Transfer Learning",
		zh: "迁移学习",
		summary: "把已有任务学到的能力迁移到新任务上的方法。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"迁移学习像先学通用基础，再去适配新场景。预训练模型和微调就是很常见的迁移思路。",
		commonMisunderstanding:
			"迁移不是直接复制答案，新任务差异太大时仍需要数据和验证。",
		relatedTerms: ["Pre-training", "Fine-Tuning", "Few-Shot"],
	},
	{
		term: "Transformer",
		zh: "Transformer 模型",
		summary: "基于注意力机制的深度学习架构，是现代大语言模型核心基础之一。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"Transformer 能高效处理序列里的上下文关系，让模型更容易抓住长距离依赖，也是今天大多数大语言模型的重要结构基础。",
		commonMisunderstanding:
			"Transformer 不是某一家公司的产品，也不等于所有大模型。它是一类模型架构，而 LLM 是建立在这种架构之上的更完整系统。",
		relatedTerms: ["Attention", "MHA", "LLM", "Neural Network"],
	},
	{
		term: "Turing test",
		zh: "图灵测试",
		summary: "通过对话判断机器是否表现出类似人类智能的思想实验。",
		tag: "技术",
		category: "fundamentals",
		beginnerExplanation:
			"图灵测试关注的是机器在交流中能否让人难以区分它和人。它是 AI 历史上很重要的讨论起点。",
		commonMisunderstanding:
			"通过图灵测试不等于机器真正理解，也不等于达到 AGI。",
		relatedTerms: ["AI", "Chatbot", "AGI"],
	},
	{
		term: "Underfitting",
		zh: "欠拟合",
		summary: "模型太简单或训练不足，无法学到数据中的基本规律。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"欠拟合像连基础题型都没学会。模型在训练集和新数据上都表现不好，说明它没有捕捉到必要模式。",
		commonMisunderstanding:
			"欠拟合不是只在小模型里发生，错误特征、数据不足或训练不当也会导致它。",
		relatedTerms: ["Fitting", "Overfitting", "Loss Function"],
	},
	{
		term: "Unsupervised Learning",
		zh: "无监督学习",
		summary: "在没有人工标签的情况下从数据中发现结构或模式的方法。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"无监督学习常用于聚类、降维和表示学习。模型没有标准答案，而是自己寻找数据中的相似性、结构和潜在规律。",
		commonMisunderstanding:
			"无监督不是没人设计目标，算法仍然有假设、目标和评估方式。它只是没有像监督学习那样的显式标签。",
		relatedTerms: ["Machine Learning", "Embedding", "Training Data", "Deep Learning"],
	},
	{
		term: "Validation Data",
		zh: "验证集",
		summary: "用于调参和评估模型泛化表现的独立数据子集。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"验证集像练习后的模拟考试。它不参与直接训练，而是用来判断模型是否过拟合、调参是否有效，以及不同方案谁更靠谱。",
		commonMisunderstanding:
			"验证集不是测试集，也不应该被反复调到失去独立性。验证集一旦被过度利用，结果就会越来越不可靠。",
		relatedTerms: ["Training Data", "Overfitting", "Hyperparameter Tuning", "Machine Learning"],
	},
	{
		term: "Vector",
		zh: "向量",
		summary: "由一组数字组成、可表示方向和大小的数学对象。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"在 AI 里，文本、图片和用户行为都可以被表示成向量。向量让机器能计算相似度、距离和关系。",
		commonMisunderstanding:
			"向量不是内容原文，而是便于计算的数字表示。",
		relatedTerms: ["Embedding", "Vector Database", "Latent Space"],
	},
	{
		term: "Vector Database",
		zh: "向量数据库",
		summary: "用于存储和检索向量表示的数据库系统。",
		tag: "技术",
		category: "llm-prompting",
		beginnerExplanation:
			"向量数据库常和 RAG 一起使用。它根据语义相似度找资料，而不只依赖关键词完全匹配。",
		commonMisunderstanding:
			"向量数据库不是万能知识库，资料切分、嵌入质量和检索策略都会影响结果。",
		relatedTerms: ["Embedding", "RAG", "Vector"],
	},
	{
		term: "Weight",
		zh: "模型权重",
		summary: "神经网络连接中的可学习参数，决定信号如何传递。",
		tag: "技术",
		category: "model-mechanisms",
		beginnerExplanation:
			"权重像模型内部的调节旋钮。训练会改变这些值，让模型更好地把输入映射成输出。",
		commonMisunderstanding:
			"权重不是人工手写知识点，而是训练过程学出的数字参数。",
		relatedTerms: ["Parameters", "Neural Network", "Gradient Descent"],
	},
	{
		term: "XAI",
		zh: "可解释的人工智能",
		summary: "让人更容易理解、检查和追责 AI 决策依据与过程的研究方向。",
		tag: "通识",
		category: "frontier",
		beginnerExplanation:
			"XAI 关注的不是模型会不会答，而是人能不能理解它为什么这么答、哪些因素影响了结果、什么时候不该相信它。",
		commonMisunderstanding:
			"可解释不等于模型内部完全透明，也不等于结果自动正确；解释只是帮助人更好地审查风险。",
		relatedTerms: ["Alignment", "Bias", "Hallucination", "Generalization ability"],
	},
	{
		term: "Zero-Shot",
		zh: "零样本学习",
		summary: "没有看到特定任务样本时，仍尝试完成新任务的能力或方法。",
		tag: "技术",
		category: "machine-learning",
		beginnerExplanation:
			"零样本学习依赖模型已有知识和泛化能力。大模型常能在没有示例的情况下，根据指令完成新格式任务。",
		commonMisunderstanding:
			"零样本不等于零成本可靠，复杂任务仍需要示例、验证或微调。",
		relatedTerms: ["Few-Shot", "Generalization ability", "Prompt Engineering"],
	},
] satisfies GlossaryTerm[];

export function enrichGlossaryTerm(term: GlossaryTerm): GlossaryTermEntry {
	const config = coreTermConfig[term.term];
	const slug = term.slug ?? slugifyGlossaryTerm(term.term);
	const depth = term.depth ?? (config ? "core" : "card");
	const hasDetailPage = term.hasDetailPage ?? config?.hasDetailPage ?? false;

	return {
		...term,
		aliases: term.aliases ?? config?.aliases ?? [],
		depth,
		hasDetailPage,
		href: term.href ?? `/glossary/${slug}`,
		slug,
		sourceLevel: term.sourceLevel ?? config?.sourceLevel ?? "user-material",
		stability: term.stability ?? config?.stability ?? "stable",
	};
}

export const glossaryTermEntries = glossaryTerms.map(enrichGlossaryTerm);

export const glossaryCoreTerms = glossaryTermEntries.filter(
	(term) => term.depth === "core",
);

export const glossaryTermsByCategory = glossaryCategories.map((category) => ({
	...category,
	terms: glossaryTermEntries.filter((term) => term.category === category.id),
}));

export const glossaryTagOrder: GlossaryTag[] = [
	"通识",
	"技术",
	"产品",
	"公司",
	"商业",
];

export const glossaryTermCount = glossaryTermEntries.length;
