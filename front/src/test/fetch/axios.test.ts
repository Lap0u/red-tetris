import { describe, expect, it } from "vitest";
import axiosInstance from "../../axios/axios";


describe('Axios Instance Configuration', () => {
  it('baseURL is set correctly', () => {
    expect(axiosInstance.defaults.baseURL).toBe('http://localhost:3000/api/');
  });

  it('headers are set correctly', () => {
    expect(axiosInstance.defaults.headers['Content-Type']).toBe('application/json');
  });
});
