import apiClient from '@/services/apiClient';
import type { 
  Participant, 
  CreateParticipantDto, 
  UpdateParticipantDto 
} from '@/interfaces/Participant';

// API повертає юзерів з полем 'password', ми його видаляємо
// для безпеки перед збереженням у стан додатку.
type ApiUser = Participant & { password?: string };

const mapApiUserToParticipant = (apiUser: ApiUser): Participant => {
  const { password, ...participant } = apiUser;
  return participant;
};

export const userRepository = {
  
  async getAll(): Promise<Participant[]> {
    const response = await apiClient.get<ApiUser[]>('/users'); //
    return response.data.map(mapApiUserToParticipant);
  },

  async getById(id: number): Promise<Participant> {
    const response = await apiClient.get<ApiUser>(`/users/${id}`); //
    return mapApiUserToParticipant(response.data);
  },

  async create(userData: CreateParticipantDto): Promise<Participant> {
    const response = await apiClient.post<ApiUser>('/users/', userData); //
    return mapApiUserToParticipant(response.data);
  },

  async update(id: number, userData: UpdateParticipantDto): Promise<Participant> {
    const response = await apiClient.put<ApiUser>(`/users/${id}`, userData); //
    return mapApiUserToParticipant(response.data);
  },

  async delete(id: number): Promise<boolean> {
    // API (згідно з OAS) повертає boolean
    const response = await apiClient.delete<boolean>(`/users/${id}`); //
    return response.data;
  },

  async checkEmailAvailability(email: string): Promise<boolean> {
    const response = await apiClient.post<{ isAvailable: boolean }>(
      '/users/is-available', //
      { email }
    );
    return response.data.isAvailable;
  }
};