import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-cc9582ee`;

// Helper function to get auth headers
function getAuthHeaders(accessToken?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }
  
  return headers;
}

// Helper function to handle response
async function handleResponse(response: Response) {
  const contentType = response.headers.get('content-type');
  
  // Check if response is JSON
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }
    
    return data;
  } else {
    // If not JSON, get text for debugging
    const text = await response.text();
    console.error('Non-JSON response:', text);
    throw new Error(`Server error: ${text.substring(0, 100)}`);
  }
}

// Auth API
export const authAPI = {
  async signup(username: string, password: string, fullName: string, optionalInfo?: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ username, password, fullName, optionalInfo }),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Signup API error:', error);
      throw error;
    }
  },

  async login(username: string, password: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ username, password }),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  async getMe(accessToken: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        method: 'GET',
        headers: getAuthHeaders(accessToken),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Get user API error:', error);
      throw error;
    }
  },
};

// Competition API
export const competitionAPI = {
  async getAll() {
    try {
      const response = await fetch(`${API_BASE_URL}/competitions`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      const data = await handleResponse(response);
      return data.competitions;
    } catch (error) {
      console.error('Get competitions API error:', error);
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/competitions/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      const data = await handleResponse(response);
      return data.competition;
    } catch (error) {
      console.error('Get competition API error:', error);
      throw error;
    }
  },
};

// Comment API
export const commentAPI = {
  async getComments(competitionId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/competitions/${competitionId}/comments`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      const data = await handleResponse(response);
      return data.comments;
    } catch (error) {
      console.error('Get comments API error:', error);
      throw error;
    }
  },

  async postComment(competitionId: string, text: string, accessToken: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/competitions/${competitionId}/comments`, {
        method: 'POST',
        headers: getAuthHeaders(accessToken),
        body: JSON.stringify({ text }),
      });
      
      const data = await handleResponse(response);
      return data.comment;
    } catch (error) {
      console.error('Post comment API error:', error);
      throw error;
    }
  },
};