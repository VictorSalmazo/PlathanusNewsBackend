const News = require('../news/news');

const news = new News();

const createNews = async (req, res) => {
  const id = news.createId();

  try {
    news.create(req.body, id);
    res.json({ success: true, message: 'Notícia postada com sucesso.' });
  } catch (error) {
    res.json({
      success: false,
      message: 'Alguma coisa deu errado!',
    });
    console.log('Erro ao postar notícia', error.message);
  }
};

const getAllNews = async (req, res) => {
  try {
    const data = await news.getAll();
    res.json({ success: true, news: data });
  } catch (error) {
    res.json({
      success: false,
      message: 'Alguma coisa deu errado!',
    });
    console.log('Erro ao buscar notícias', error.message);
  }
};

const getSingleNews = async (req, res) => {
  try {
    const data = await news.getSingle(req.params.id);
    if (!data) {
      return res.json({
        success: false,
        message: 'Notícia não encontrada!',
      });
    }

    res.json({
      success: true,
      news: data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Alguma coisa deu errado!',
    });
    console.log('Erro ao buscar notícias', error.message);
  }
};



const searchPosts = async (req, res) => {
  try {
    const { query } = req.params;
    if (query.trim()) {
      const response = await news.searchPosts(req.params.query);
      if (response.length === 0)
        return res.json({ success: false, message: 'Nenhuma notícia encontrada' });
      res.json({ success: true, news: response });
    }

    res.json({ success: false, message: 'Nenhuma notícia encontrada' });
  } catch (error) {
    res.json({
      success: false,
      message: 'Algo deu errado!',
    });
    console.log(error);
  }
};

module.exports = {
  createNews,
  getAllNews,
  getSingleNews,
  getNewsByCategory,
  searchPosts,
};
