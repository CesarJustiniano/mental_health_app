export type RootStackParamList = {
  Root: undefined;
  NewPost: undefined;
  NewComment: undefined;
  CommentList: undefined;
  ChatRoom: undefined;
  ChatCategory: undefined;
  GroupChatList: undefined;
  GroupChatRoom: undefined;
  ProfileSettings: undefined;
  SignUpScreen: undefined;
  NotFound: undefined;
  InformationBoardScreen: undefined;
  HelpCenterScreen:undefined;
  LoginPsychologistScreen:undefined;
  PsychologistMenuScreen:undefined;
  UserMenuScreen:undefined;
  FirstScreen: undefined;
};

export type BottomTabParamList = {
  Post: undefined;
  TabTwo: undefined;
  Chat: undefined;
  Schedule: undefined;
  Info: undefined;
};

export type FeedNavigatorParamList = {
  FeedScreen: undefined;
};

export type ChatNavigatorParamList = {
  ChatScreen: undefined;
};

export type ScheduleNavigatorParamList = {
  ScheduleScreen: undefined;
};

export type InformationBoardNavigatorParamList = {
  InformationBoardScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type UserType = {
  _id: string,
  firstName: string,
  username: string,
  image?: string,
  status?: string,
}

export type PostType = {
  _id: string,
  createdAt: string,
  postedBy: UserType,
  body: string,
  comments: CommentType[],
  image?: string,
  video?: string,
}

export type CommentType = {
  _id: string,
  createdAt: string,
  postedBy: UserType,
  text: string,
  postIn: PostType,
}

export type Message = {
  _id: string,
  content: string,
  createdAt: string,
  user: UserType,
}

export type ChatRoom = {
  _id: string,
  users: UserType[],
  lastMessage: Message,
}

export type GroupChatRoom = {
  _id: string,
  name: string,
  users: UserType[],
  lastMessage: Message,
  description: string,
  image: string,
}

export type Category = {
  _id: string,
  name: string,
  groupChats?: GroupChatRoom[],
  posts?: PostType[],
}

export type Params = {
  A: {
    id: string,
  };
}
