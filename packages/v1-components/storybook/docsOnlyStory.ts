type StoryWithTags = {
  tags?: string[];
}

export const docsOnlyStory = <TStory extends StoryWithTags>(story: TStory): TStory => ({
  ...story,
  tags: Array.from(new Set([...(story.tags ?? []), '!dev'])),
})
