import http from "@/http-common";

/* eslint-disable */
class DrumDataService {
  getAll(): Promise<any> {
    return http.get("/drums");
  }

  get(id: any): Promise<any> {
    return http.get(`/drums/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/drums", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/drums/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/drums/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/drums`);
  }

  findByType(type: string): Promise<any> {
    return http.get(`/tutorials?type=${type}`);
  }
}

export default new DrumDataService();
