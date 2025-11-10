import { faker } from '@faker-js/faker';

interface article {
  title: string;
  description: string;
  content: string;
  tag: string;
}

const articles: article[] = [];

for (let i = 0; i < 3; i++) {
  let title = faker.music.artist();
  let description = faker.music.album();
  let content = faker.music.songName();
  const tag = 'qa-senpai-the-best';

  articles.push({ title, description, content, tag });
}

for (let article of articles) {
  console.log(article);
}
