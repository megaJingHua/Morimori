import React, { useEffect, useState } from 'react';
import { supabase } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Loader2, Save, ShieldAlert, Users, ArrowLeft } from 'lucide-react';
import * as moriDb from '../services/moriDb';

const ADMIN_EMAIL = 'h12732u@gmail.com';

interface AdminDashboardProps {
  onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Data State
  const [userCount, setUserCount] = useState(0);
  const [settings, setSettings] = useState<moriDb.SystemSettings>({
    maxUsers: 0,
    maxBookmarksPerUser: 0,
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || session.user.email !== ADMIN_EMAIL) {
        toast.error('Access Denied: You do not have permission to view this page.');
        onBack(); // Return to previous screen
        return;
      }

      // Load Data
      await loadDashboardData(session.access_token);
    } catch (error) {
      console.error('Auth error:', error);
      onBack();
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async (token: string) => {
    const [currentSettings, userIds] = await Promise.all([
      moriDb.getSystemSettings(token),
      moriDb.getAllUserIds(token)
    ]);
    
    setSettings(currentSettings);
    setUserCount(userIds.length);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");
      await moriDb.saveSystemSettings(settings, session.access_token);
      toast.success('System settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-600 text-white">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">MoriMori Logic Admin</h1>
              <p className="text-slate-500">System Control Panel ({ADMIN_EMAIL})</p>
            </div>
          </div>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to App
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registered Users</CardTitle>
              <Users className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userCount}</div>
              <p className="text-xs text-slate-500">
                Current active members in KV store
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Database Status</CardTitle>
              <div className={`h-2 w-2 rounded-full ${userCount >= settings.maxUsers ? 'bg-red-500' : 'bg-green-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userCount >= settings.maxUsers ? 'Limit Reached' : 'Active'}
              </div>
              <p className="text-xs text-slate-500">
                {settings.maxUsers - userCount} slots remaining
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Settings Form */}
        <Card>
          <CardHeader>
            <CardTitle>System Limits</CardTitle>
            <CardDescription>
              Control resource usage to prevent database overflow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="maxUsers">Max Allowed Users</Label>
                <Input
                  id="maxUsers"
                  type="number"
                  value={settings.maxUsers}
                  onChange={(e) => setSettings({ ...settings, maxUsers: parseInt(e.target.value) || 0 })}
                  className="max-w-md"
                />
                <p className="text-sm text-slate-500">
                  Once this limit is reached, new users will be blocked from registering.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxBookmarks">Max Bookmarks Per User</Label>
                <Input
                  id="maxBookmarks"
                  type="number"
                  value={settings.maxBookmarksPerUser}
                  onChange={(e) => setSettings({ ...settings, maxBookmarksPerUser: parseInt(e.target.value) || 0 })}
                  className="max-w-md"
                />
                <p className="text-sm text-slate-500">
                  Maximum number of articles a single user can save.
                </p>
              </div>

              <Button type="submit" disabled={saving} className="bg-slate-900 text-white hover:bg-slate-800">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Settings
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
