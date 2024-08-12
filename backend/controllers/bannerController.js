const Banner = require('../models/bannerModel');

exports.getBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBanner = async (req, res) => {
  try {
    const { description, link, timer, isVisible } = req.body;
    const banner = await Banner.create({
      description,
      link,
      timer,
      isVisible
    });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, link, timer, isVisible } = req.body;
    let banner = await Banner.findByPk(id);

    if (banner) {
      banner.description = description;
      banner.link = link;
      banner.timer = timer;
      banner.isVisible = isVisible;
    } else {
      banner = await Banner.create({ id, description, link, timer, isVisible });
    }

    await banner.save();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    let banner = await Banner.findByPk(id);

    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }

    banner.isVisible = !banner.isVisible;
    await banner.save();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBanners = async (req, res) => {
  try {
    console.log("getting banners");
    const banners = await Banner.findAll();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findByPk(id);

    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }

    await banner.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
