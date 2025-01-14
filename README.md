1. node连接为mysql

2. 课程里面 _id，在mysql中改成了 id，并在node中生成的id添加数据的时候携带过去

3. 定义 username 类型等规则，需要3张表的 username 一致，否则 新闻和产品表无法关联 user 表

4. 在 news 表中 category、isPublish 属性为字符串类型，前端组件这里需要做出改动，否则类型出错执行失败

   ```HTML
   <el-table-column label="是否发布"> 
        <template #default="scope">
             <el-switch
                    v-model="scope.row.isPublish"
                        active-value="1"  需要把 : 去掉
                         inactive-value="0" 需要把 : 去掉
                          @change="handleSwitchChange(scope.row)"
                        />
         </template>
   </el-table-column>
   ```

6. news表中外键 username 关联 user 表中 username，请求接口需要加上query： username 参数
   查询单个信息和获取该用户添加的新闻或产品，格式如下：
   单个信息：/?id=${route.params.id}
   获取用户的新闻和产品：/?username=${store.state.userInfo.username}

7. node项目包含pm2配置，可在 package.json 文件查看启动命令
   监听 pm2 日志文件命令：Get-Content -Path 绝对路径 -Tail 10 -Wait
   例如：Get-Content -Path Z:\Node\项目\server\pm2-err.log -Tail 10 -Wait

8. 前端项目：admin、web 皆是千峰课件资料里的，不是本人写的，只做了对应node接口的改动