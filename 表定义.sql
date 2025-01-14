-- 创建用户表
create table user
(
    id           bigint auto_increment comment '用户唯一标识'
        primary key,
    username     varchar(45) charset utf8  not null comment '用户登录名',
    password     varchar(45) charset utf8  not null comment '用户登录密码',
    gender       int        default 0      null comment '性别',
    role         int        default 2      null comment '权限',
    avatar       varchar(255) charset utf8 null comment '头像',
    introduction varchar(255) charset utf8 null comment '介绍',
    status       tinyint(1) default 0      null comment '用户状态(是一个布尔值)
0 表示用户状态正常
1 表示用户被禁用',
    constraint `Unique`
        unique (id, username)
)
    comment '用户信息表' collate = utf8mb4_unicode_ci;

create index username
    on user (username)
    comment '用户';

INSERT INTO user VALUES ('1', '0555', '123456', 0, 2, '', '超级管理员', 0);

-- 创建新闻表
CREATE TABLE news
(
    `id`        BIGINT                   NOT NULL AUTO_INCREMENT,
    `title`     varchar(255) COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '标题',
    `content`   varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '内容',
    `category`  ENUM ('1','2','3')                       DEFAULT '1' COMMENT '类别 1、2、3',
    `cover`     varchar(255) COLLATE utf8mb4_unicode_ci  DEFAULT NULL COMMENT '存储新闻封面图片的URL或路径',
    `isPublish` ENUM ('0','1')                           DEFAULT '0' COMMENT '指示新闻是否已经发布',
    `editTime`  datetime                                 DEFAULT NULL COMMENT '存储新闻最后编辑的时间戳',
    `username`  varchar(45) CHARSET utf8 NOT NULL COMMENT '用于关联 user 表的 用户',
    PRIMARY KEY (`id`),
    FOREIGN KEY (`username`) REFERENCES user (`username`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 11
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

alter table news
    add constraint username
        foreign key (username) references user (username)
            on update cascade on delete cascade;

-- 创建产品表
CREATE TABLE product
(
    id           BIGINT                   NOT NULL AUTO_INCREMENT,
    title        varchar(255)  DEFAULT NULL COMMENT '产品标题',
    introduction varchar(1000) DEFAULT NULL COMMENT '产品介绍',
    detail       varchar(1000) DEFAULT NULL COMMENT '产品详情',
    cover        varchar(255)  DEFAULT NULL COMMENT '产品封面',
    editTime     datetime      DEFAULT NULL COMMENT '最后编辑的时间戳',
    username     varchar(45) CHARSET utf8 NOT NULL COMMENT '用于关联 user 表的 用户，表示是哪位用户添加的产品',
    PRIMARY KEY (`id`),
    FOREIGN KEY (`username`) REFERENCES user (`username`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 594
  DEFAULT CHARSET = utf8mb4;


alter table product
    add constraint product_ibfk_1
        foreign key (username) references user (username)
            on update cascade on delete cascade;