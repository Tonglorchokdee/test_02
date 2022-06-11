import { IImgSlideParams } from "@/interfaces/upload"

class ImgSlideService {
    axios: any;
    list: any;
    id: any;
    constructor(axios: any) {
        this.axios = axios;
    }

    admin = () => {
        return this.axios
            .$request({
                url: "/api/ImgSlide/admin",
                method: "GET",
            })
            .then((response: any) => {
                if (response.status == 200) {
                    this.list = [];
                    response.m_model
                        .filter((x: any) => x.parent_id == 0)
                        .forEach((element: any) => {
                            this.list.push({
                                id: element.data_id,
                                picture: element.data_file,
                                link: element.data_link,
                                name: element.data_title,
                                start_date: element.start_date,
                                end_date: element.end_date,
                                date: element.created_date,
                                fixdate: element.updated_date,
                                parent_id: 0,
                            });
                        });
                    return this.list;
                }
            })
            .catch((err: any) => console.error(err));
    }

    create = (params: IImgSlideParams) => {
        try {
            return this.axios
                .$request({
                    url: "/api/ImgSlide",
                    method: "POST",
                    data: {
                        data_title: params.data_title,
                        data_file: params.data_file,
                        data_link: params.data_link,
                        start_date: params.start_date,
                        end_date: params.end_date,
                        parent_id: params.parent_id,
                        language_id: params.language_id,
                        created_by: params.created_by,
                    },
                })
                .then((response: any) => {
                    if (response) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch((err: any) => {
                    return false;
                });
        } catch (error: any) {
            console.log(error);
        }
    }

    edit = (params: IImgSlideParams) => {
        return this.axios
            .$request({
                url: "/api/ImgSlide/" + params.id,
                method: "PATCH",
                data: {
                    data_title: params.data_title,
                    data_file: params.data_file,
                    data_link: params.data_link,
                    start_date: params.start_date,
                    end_date: params.end_date,
                    updated_by: params.updated_by,
                },
            })
            .then((response: any) => {
                if (response) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((err: any) => {
                console.error(err);
                return false;
            });
    }

    delete = (params: IImgSlideParams) => {
        return this.axios
            .$request({
                url: "/api/ImgSlide/" + params.id,
                method: "DELETE",
                data: {
                    deleted_by: params.deleted_by,
                },
            })
            .then((response: any) => {
                if (response) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((err: any) => console.error(err));
    }

    parentLang = (params: IImgSlideParams) => {
        this.id = 0;
        return this.axios
            .$request({
                url: "/api/ImgSlide/parentLang/" + params.id,
                method: "GET",
            })
            .then((response: any) => {
                if (response.ParentLang.length > 0) {
                    this.id = response.ParentLang[0].data_id
                }
                return this.id;
            })
            .catch((err: any) => console.error(err));
    }
}

export default ImgSlideService;