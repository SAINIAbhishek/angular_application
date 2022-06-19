import {PostInterface} from '../models/post';

export const PostsMocks: Array<PostInterface> = [
  {id: 1, body: 'Dummy post is', title: 'Post 1', userId: 1},
  {id: 2, body: 'Dummy post is', title: 'Post 2', userId: 2},
  {id: 3, body: 'Dummy post is', title: 'Post 3', userId: 3}
];

export const PostMock: PostInterface = {
  id: 1,
  body: 'Dummy post is',
  title: 'Post 1',
  userId: 1
};
