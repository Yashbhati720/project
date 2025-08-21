import { useState, useEffect } from 'react';
import './stylesheet.css';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  MessageSquare, 
  Send,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  History
} from 'lucide-react';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('conversation');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTicket({
        id: parseInt(id),
        title: 'Login issues with new account',
        description: 'Unable to login after creating account. I keep getting an error message saying "Invalid credentials" even though I\'m sure I\'m using the correct email and password.',
        status: 'open',
        priority: 'high',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T14:20:00Z',
        assignee: 'John Doe',
        customer: 'Alice Johnson',
        conversation: [
          {
            id: 1,
            author: 'Alice Johnson',
            role: 'customer',
            message: 'I created my account yesterday but I can\'t seem to log in. I\'ve tried resetting my password twice.',
            timestamp: '2024-01-15T10:30:00Z'
          },
          {
            id: 2,
            author: 'John Doe',
            role: 'agent',
            message: 'Hi Alice, I\'m sorry to hear you\'re having trouble logging in. Let me check your account status and see what might be causing this issue.',
            timestamp: '2024-01-15T11:15:00Z'
          },
          {
            id: 3,
            author: 'John Doe',
            role: 'agent',
            message: 'I can see your account was created successfully. Can you please try clearing your browser cache and cookies, then attempt to log in again?',
            timestamp: '2024-01-15T11:20:00Z'
          }
        ],
        suggestions: [
          {
            id: 1,
            title: 'Password Reset Guide',
            content: 'Step-by-step instructions for resetting your password',
            relevance: 95
          },
          {
            id: 2,
            title: 'Browser Compatibility Issues',
            content: 'Common login issues related to browser settings',
            relevance: 87
          },
          {
            id: 3,
            title: 'Account Activation Process',
            content: 'How to verify if your account is properly activated',
            relevance: 82
          }
        ],
        auditLog: [
          {
            id: 1,
            action: 'Ticket created',
            user: 'Alice Johnson',
            timestamp: '2024-01-15T10:30:00Z'
          },
          {
            id: 2,
            action: 'Assigned to John Doe',
            user: 'System',
            timestamp: '2024-01-15T10:35:00Z'
          },
          {
            id: 3,
            action: 'Status changed to Open',
            user: 'John Doe',
            timestamp: '2024-01-15T11:15:00Z'
          },
          {
            id: 4,
            action: 'Response added',
            user: 'John Doe',
            timestamp: '2024-01-15T11:20:00Z'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add new message to conversation
    const newMsg = {
      id: ticket.conversation.length + 1,
      author: 'John Doe', // Current user
      role: 'agent',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setTicket(prev => ({
      ...prev,
      conversation: [...prev.conversation, newMsg]
    }));

    setNewMessage('');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Ticket not found</p>
        <Link to="/tickets" className="text-primary-600 hover:text-primary-500 mt-2 inline-block">
          Back to tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/tickets"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            {getStatusIcon(ticket.status)}
            <h1 className="text-2xl font-bold text-gray-900">{ticket.title}</h1>
          </div>
          <p className="text-gray-600 mt-1">Ticket #{ticket.id}</p>
        </div>
      </div>

      {/* Ticket Info */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              ticket.status === 'open' ? 'bg-red-100 text-red-800' :
              ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {ticket.status.replace('-', ' ')}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Priority</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
              ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {ticket.priority}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Assignee</h3>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-900">{ticket.assignee}</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
          <p className="text-gray-900">{ticket.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'conversation', name: 'Conversation', icon: MessageSquare },
            { id: 'suggestions', name: 'AI Suggestions', icon: Lightbulb },
            { id: 'audit', name: 'Audit Log', icon: History }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'conversation' && (
          <div className="space-y-6">
            {/* Conversation */}
            <div className="card p-6">
              <div className="space-y-6">
                {ticket.conversation.map((message) => (
                  <div key={message.id} className="flex space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'customer' ? 'bg-gray-100' : 'bg-primary-100'
                    }`}>
                      <User className={`w-4 h-4 ${
                        message.role === 'customer' ? 'text-gray-600' : 'text-primary-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{message.author}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          message.role === 'customer' ? 'bg-gray-100 text-gray-600' : 'bg-primary-100 text-primary-600'
                        }`}>
                          {message.role}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(message.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reply Form */}
            <div className="card p-6">
              <form onSubmit={handleSendMessage}>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Add a response
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="input-field"
                    placeholder="Type your response..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Response</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-4">
            {ticket.suggestions.map((suggestion) => (
              <div key={suggestion.id} className="card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">{suggestion.title}</h3>
                    <p className="text-gray-600 mb-3">{suggestion.content}</p>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {suggestion.relevance}% match
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="btn-primary text-sm">Use Suggestion</button>
                  <button className="btn-secondary text-sm">View Full Article</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="card p-6">
            <div className="space-y-4">
              {ticket.auditLog.map((entry) => (
                <div key={entry.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{entry.action}</p>
                    <p className="text-xs text-gray-500">by {entry.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetail;