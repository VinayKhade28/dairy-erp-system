// src/components/DebugConnection.tsx
import React, { useState } from 'react';
import { 
  Button, 
  Box, 
  Typography, 
  Alert, 
  CircularProgress,
  Card,
  CardContent,
  Divider 
} from '@mui/material';
import { authService } from '../services/authService';
import api from '../services/api';

const DebugConnection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const testEndpoints = async () => {
    setLoading(true);
    setResults([]);
    setError('');

    const tests = [
      {
        name: 'Backend Health Check',
        url: '/Auth/test',
        method: 'GET'
      },
      {
        name: 'CORS Test',
        url: '/Auth/test',
        method: 'OPTIONS'
      },
      {
        name: 'Farmers API',
        url: '/Farmers',
        method: 'GET'
      }
    ];

    for (const test of tests) {
      try {
        console.log(`Testing: ${test.name} at ${test.url}`);
        
        let response;
        if (test.method === 'OPTIONS') {
          response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}${test.url}`, {
            method: 'OPTIONS',
            mode: 'cors'
          });
        } else {
          response = await api.get(test.url);
        }

        setResults(prev => [...prev, {
          name: test.name,
          status: '✅ Success',
          details: `Status: ${response.status}`,
          data: test.method === 'OPTIONS' ? 'CORS headers received' : 'Response received'
        }]);
      } catch (err: any) {
        setResults(prev => [...prev, {
          name: test.name,
          status: '❌ Failed',
          details: `Error: ${err.message}`,
          data: err.response?.data || 'No response'
        }]);
      }
    }

    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      // Test with demo credentials
      const result = await authService.login({
        username: 'admin',
        password: 'admin123'
      });
      
      setResults(prev => [...prev, {
        name: 'Login Test',
        status: '✅ Success',
        details: `User: ${result.fullName}, Role: ${result.role}`,
        data: 'Token received and stored'
      }]);
    } catch (err: any) {
      setResults(prev => [...prev, {
        name: 'Login Test',
        status: '❌ Failed',
        details: `Error: ${err.message}`,
        data: err.response?.data || 'Check credentials'
      }]);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Connection Debugger
      </Typography>
      
      <Typography variant="body1" paragraph>
        API Base URL: <strong>{process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}</strong>
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={testEndpoints}
          disabled={loading}
        >
          Test API Endpoints
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={testLogin}
          disabled={loading}
        >
          Test Login
        </Button>
      </Box>

      {loading && <CircularProgress />}

      {results.length > 0 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Test Results
            </Typography>
            {results.map((result, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {result.name}
                  </Typography>
                  <Typography variant="body2" color={result.status.includes('✅') ? 'success.main' : 'error.main'}>
                    {result.status}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {result.details}
                </Typography>
                {result.data && (
                  <Typography variant="caption" component="pre" sx={{ 
                    bgcolor: 'grey.100', 
                    p: 1, 
                    borderRadius: 1,
                    mt: 1,
                    fontSize: '0.75rem',
                    overflow: 'auto'
                  }}>
                    {JSON.stringify(result.data, null, 2)}
                  </Typography>
                )}
                {index < results.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default DebugConnection;