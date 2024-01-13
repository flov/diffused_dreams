export const paths = {
  home() {
    return "/";
  },
  topicShowPath(topicId: string) {
    return `/topics/${topicId}`;
  },
  postCreatePath(slug: string) {
    return `/topics/${slug}/posts/new`;
  },
  postShowPath(postId: string, slug: string) {
    return `/topics/${slug}/posts/${postId}`;
  },
};
