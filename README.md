# ERMB: E-commerce Recommendations with Micro-Behaviors Dataset

This repository accompanies our paper accepted by **CIKM 2026**:

> **EBD: Engagement-aware Bidirectional Debiasing with User Micro-Behaviors in E-commerce Recommendations**
> Weiqiu Wang, Runfeng Zhang, Yifei Liu, Anqi Zhu, Jie Fang, Mingming Pan, Haihong Jiang, Wen Xu, Yipeng Yu, Jiahao Yu, Yijiao Wang, Yeqiu Yang, Fei Sun, Jian Wu, Yuning Jiang, Xu Liu, Chengxiao Feng, Bo Zheng
> The 35th International ACM Conference on Information and Knowledge Management (CIKM '26), Rome, Italy, November 7–11, 2026.
> DOI: [https://doi.org/10.1145/3799682.3840628](https://doi.org/10.1145/3799682.3840628)

A project page is available in [`docs/`](docs/index.html) (also deployable as GitHub/GitLab Pages, see below).

---

## 1. About the Paper

Click-through Rate (CTR) prediction and Conversion Rate (CVR) prediction, as core tasks in modern e-commerce recommender systems, are conventionally formulated as binary classification tasks using click/purchase labels. However, this paradigm suffers from **Intention-Action Divergence (IAD) bias**, where users' explicit actions (e.g., click/purchase) misalign with their implicit interest levels inferred from fine-grained interactions (e.g., dwell time, swipe velocity).

To mitigate the IAD bias, our paper makes the following contributions:

- **Micro-behavior Map & MB-driven Intention Modeling.** We mine more than one hundred kinds of user-device interactions in the decision-making process, termed **Micro-Behaviors (MBs)**, categorized into pre-click MBs (pre-MBs) and post-click MBs (post-MBs). Instead of constructing resource-consuming sequential features, we compress MBs into a lightweight sample-level **engagement score** that scalably quantifies users' intentions for billions of samples.
- **Pointwise-and-Pairwise Engagement Debiasing (P²ED).** For the CVR task, we propose the P²ED approach, which emphasizes low-bias samples and incorporates pairwise intention modeling as an auxiliary task, utilizing the predefined engagement scores only during training (since MBs are inaccessible in online serving).
- **Engagement-aware Bidirectional Debiasing (EBD).** To extend P²ED to the CTR task despite missing engagement scores in non-click samples, we propose a siamese co-training framework in which the CTR module and the engagement module debias each other bidirectionally.
- **Open-source Dataset.** We release ERMB, the first public dataset with rich MB signals, to advance research on MBs and IAD bias.

Our method delivers **+2.2‰ / +1.4‰ AUC gains** on CVR/CTR offline evaluation and drives **+4.27% GMV growth** and **+1.38% IPV lift** in online A/B tests. The framework has been deployed on a major e-commerce platform.

## 2. About the ERMB Dataset

The **ERMB dataset** is the first publicly available industrial-scale recommendation dataset containing rich micro-behavioral signals. Unlike existing public benchmarks that only log terminal actions such as clicks or conversions, ERMB preserves the fine-grained interaction trajectory between exposure and final action, enabling a faithful investigation of user intention modeling through MBs.

Derived from a major e-commerce platform, ERMB comprises **66.55 million impression samples** collected across diverse product categories and user segments — significantly larger than widely recognized CTR prediction benchmarks such as Avazu, Criteo, and MovieLens. Each impression sample contains:

1. **Conventional user/item/context features**;
2. **Behavior sequence features**;
3. **More than one hundred micro-behavior signals** spanning both pre-click cues and post-click activities.

Rigorous anonymization protocols, including identifier hashing and attribute generalization, are applied to ensure data privacy compliance.

### Statistics

| Dataset Split | #Users | #Items | #Impressions | #Clicks |
|:---:|:---:|:---:|:---:|:---:|
| Train | 12.75M | 7.17M | 52.59M | 18.01M |
| Test  | 3.79M  | 3.33M | 13.96M | 4.75M  |
| Total | 15.80M | 8.01M | 66.55M | 22.76M |

### Micro-Behaviors

**Pre-click MBs** occur on the dual-column feed before a click decision, grouped into:

| Feature Group | Features |
|---|---|
| Exposure | Hotspot Presence, Hotspot Dwell Duration, Weighted Hotspot Browsing Time |
| Swipe | Backward Swipe, Swipe Velocity, Velocity Levels |
| Click | Click Distance, Click Distance Levels |

**Post-click MBs** occur in single-column Waterfall Pages (WP) and Product Detail Pages (PDPs). Representative post-MBs include Product Detail Page Dwell Time, Swipe Down, Recommend-Tab Clicks, Review Tag Clicks, Review Views, Ask Everyone Entry Clicks, Product Detail Image Clicks, Image Zoom-Ins, Share, Service Module Clicks, and Live Chat Clicks. The complete list of additional post-MBs with definitions is provided in [docs/additional_post_mbs.md](docs/additional_post_mbs.md).

## 3. Repository Structure

```
EBD/
├── README.md                       # This file
├── docs/
│   ├── index.html                  # Project page (deployable via GitHub/GitLab Pages)
│   └── additional_post_mbs.md      # Complete list of additional post-MBs (Table in the paper)
├── dataset/                        # Dataset files and field descriptions (released here)
└── .gitlab-ci.yml                  # GitLab Pages deployment for docs/
```

## 4. Deploying the Project Page

- **GitLab Pages**: the included `.gitlab-ci.yml` publishes `docs/` automatically.
- **GitHub Pages**: set `docs/` as the Pages source in the repository settings; `docs/index.html` is self-contained.

## 5. Citation

If you use the ERMB dataset or find our work helpful, please cite:

```bibtex
@inproceedings{wang2026ebd,
  title     = {EBD: Engagement-aware Bidirectional Debiasing with User Micro-Behaviors in E-commerce Recommendations},
  author    = {Wang, Weiqiu and Zhang, Runfeng and Liu, Yifei and Zhu, Anqi and Fang, Jie and Pan, Mingming and Jiang, Haihong and Xu, Wen and Yu, Yipeng and Yu, Jiahao and Wang, Yijiao and Yang, Yeqiu and Sun, Fei and Wu, Jian and Jiang, Yuning and Liu, Xu and Feng, Chengxiao and Zheng, Bo},
  booktitle = {Proceedings of the 35th ACM International Conference on Information and Knowledge Management (CIKM '26)},
  year      = {2026},
  doi       = {10.1145/3799682.3840628}
}
```

## 6. License

The dataset is released for research purposes only. Please refer to the license file in `dataset/` for terms of use.
