const base = {
    get() {
        return {
            url : "http://localhost:8080/django137r71sf/",
            name: "django137r71sf",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于Python的适老化(老年人)健康预警系统的设计与实现"
        } 
    }
}
export default base
