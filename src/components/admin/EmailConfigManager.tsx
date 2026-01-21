import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';

interface EmailConfig {
  id: number;
  recipient_email: string;
  sender_name: string;
  sender_email: string;
  enabled: boolean;
}

export function EmailConfigManager() {
  const [config, setConfig] = useState<EmailConfig | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadEmailConfig();
  }, []);

  const loadEmailConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('email_config')
        .select('*')
        .eq('enabled', true)
        .single();

      if (error) {
        console.error('Error loading config:', error);
        return;
      }

      setConfig(data);
    } catch (err) {
      console.error('Failed to load email config:', err);
    }
  };

  const handleSave = async () => {
    if (!config) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('email_config')
        .update({
          recipient_email: config.recipient_email,
          sender_name: config.sender_name,
          sender_email: config.sender_email,
        })
        .eq('id', config.id);

      if (error) {
        throw error;
      }

      setMessage({ type: 'success', text: 'Email configuration saved successfully!' });
      setIsEditing(false);

      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save configuration' });
    } finally {
      setIsSaving(false);
    }
  };

  if (!config) {
    return <div className="p-4 text-gray-500">Loading email configuration...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">📧 Email Configuration</h2>

      {message && (
        <div
          className={`p-4 rounded-lg mb-4 ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Recipient Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📬 Recipient Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              value={config.recipient_email}
              onChange={(e) => setConfig({ ...config, recipient_email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="your-email@example.com"
            />
          ) : (
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{config.recipient_email}</div>
          )}
          <p className="text-sm text-gray-500 mt-1">Daily report will be sent to this email at 6:00 AM</p>
        </div>

        {/* Sender Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            👤 Sender Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={config.sender_name}
              onChange={(e) => setConfig({ ...config, sender_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="KanakArtistry"
            />
          ) : (
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{config.sender_name}</div>
          )}
        </div>

        {/* Sender Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ✉️ Sender Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              value={config.sender_email}
              onChange={(e) => setConfig({ ...config, sender_email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="noreply@kanakartistry.com"
            />
          ) : (
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{config.sender_email}</div>
          )}
          <p className="text-sm text-gray-500 mt-1">This appears as the "From" address in the email</p>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">📊 Daily Report Status</label>
          <div className="px-4 py-2 bg-green-50 rounded-lg text-green-800 font-medium">
            ✓ Enabled - Reports send daily at 6:00 AM
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>ℹ️ How it works:</strong>
          </p>
          <ul className="text-sm text-blue-700 mt-2 list-disc list-inside space-y-1">
            <li>Daily report sent at 6:00 AM to the recipient email</li>
            <li>Includes all inquiries from the previous 24 hours</li>
            <li>If no inquiries, you'll receive a notification email</li>
            <li>Reports include client info, art details, and timeline</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 transition"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  loadEmailConfig();
                }}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Edit Configuration
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
