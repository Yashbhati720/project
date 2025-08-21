import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, BookOpen, Eye } from 'lucide-react';

const KnowledgeBase = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArticles([
        {
          id: 1,
          title: 'How to Reset Your Password',
          content: 'To reset your password, follow these steps:\n\n1. Go to the login page\n2. Click "Forgot Password"\n3. Enter your email address\n4. Check your email for reset instructions\n5. Follow the link in the email\n6. Create a new password',
          category: 'Account Management',
          tags: ['password', 'reset', 'login'],
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-12T15:30:00Z',
          views: 245
        },
        {
          id: 2,
          title: 'Browser Compatibility Issues',
          content: 'If you\'re experiencing issues with our application, it might be due to browser compatibility. Here are the supported browsers:\n\n- Chrome 90+\n- Firefox 88+\n- Safari 14+\n- Edge 90+\n\nFor best performance, please ensure your browser is up to date.',
          category: 'Technical Support',
          tags: ['browser', 'compatibility', 'technical'],
          createdAt: '2024-01-08T14:20:00Z',
          updatedAt: '2024-01-10T09:15:00Z',
          views: 189
        },
        {
          id: 3,
          title: 'Account Activation Process',
          content: 'After creating your account, you need to activate it:\n\n1. Check your email inbox\n2. Look for an email from our system\n3. Click the activation link\n4. Your account will be activated automatically\n\nIf you don\'t receive the email, check your spam folder or contact support.',
          category: 'Account Management',
          tags: ['activation', 'account', 'email'],
          createdAt: '2024-01-05T11:45:00Z',
          updatedAt: '2024-01-07T16:20:00Z',
          views: 156
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateNew = () => {
    setSelectedArticle(null);
    setIsEditing(true);
    setFormData({
      title: '',
      content: '',
      category: '',
      tags: ''
    });
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setIsEditing(true);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      tags: article.tags.join(', ')
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    const articleData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      updatedAt: new Date().toISOString()
    };

    if (selectedArticle) {
      // Update existing article
      setArticles(prev => prev.map(article => 
        article.id === selectedArticle.id 
          ? { ...article, ...articleData }
          : article
      ));
    } else {
      // Create new article
      const newArticle = {
        id: Date.now(),
        ...articleData,
        createdAt: new Date().toISOString(),
        views: 0
      };
      setArticles(prev => [newArticle, ...prev]);
    }

    setIsEditing(false);
    setSelectedArticle(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(prev => prev.filter(article => article.id !== id));
    }
  };

  const handleView = (article) => {
    setSelectedArticle(article);
    setIsEditing(false);
    // Increment view count
    setArticles(prev => prev.map(a => 
      a.id === article.id ? { ...a, views: a.views + 1 } : a
    ));
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
        <button
          onClick={handleCreateNew}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Articles List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 input-field"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className={`card p-4 cursor-pointer transition-colors ${
                  selectedArticle?.id === article.id ? 'bg-primary-50 border-primary-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleView(article)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{article.category}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{article.views}</span>
                      </div>
                      <span>Updated {new Date(article.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(article);
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(article.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Article Content/Editor */}
        <div className="lg:col-span-2">
          {isEditing ? (
            <div className="card p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                {selectedArticle ? 'Edit Article' : 'Create New Article'}
              </h2>
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="Enter article title"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="input-field"
                    placeholder="e.g., Account Management, Technical Support"
                  />
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    className="input-field"
                    placeholder="e.g., password, reset, login"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    id="content"
                    rows={12}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="input-field"
                    placeholder="Write your article content here..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button type="submit" className="btn-primary">
                    {selectedArticle ? 'Update Article' : 'Create Article'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : selectedArticle ? (
            <div className="card p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedArticle.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{selectedArticle.category}</span>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{selectedArticle.views} views</span>
                    </div>
                    <span>Updated {new Date(selectedArticle.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(selectedArticle)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700">
                  {selectedArticle.content}
                </div>
              </div>

              {selectedArticle.tags.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Article Selected</h3>
              <p className="text-gray-500 mb-6">
                Select an article from the list to view its content, or create a new one.
              </p>
              <button
                onClick={handleCreateNew}
                className="btn-primary"
              >
                Create New Article
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;