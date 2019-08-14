interface Person {
    firstName: string,
    lastName: string
}

interface TimelineItem {
    date: Date;
    title: string;
    content: string;
}

interface ActionItem {
    content: string;
}

interface RootCausesItem {
    question: string;
    answer: string;
}

export interface PostMortem {
    title: string;
    date: Date;
    authors: Person[];
    status: 'open' | 'in progress' | 'closed';
    summary: string;
    impact: string;
    rootCauses: RootCausesItem[];
    actionItems: ActionItem[];
    trigger: string;
    resolution: string;
    detection: string;
    timeline: TimelineItem[]
}
