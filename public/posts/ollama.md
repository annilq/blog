---
title: 本地部署大模型方案以及对比
date: 2024-11-27 17:06:01
tags: AI
---

### 本地部署大模型常见的方案
 1. Ollama
 2. LM Studio

### LM Studio 或 Ollama 是什么软件？
它们提供一个支持多种模型的平台，可以加载、执行、管理、部署和使用各种预训练的 LLM。可以提供RESTful api方便集成在各种UI中，它们更像是模型管理工具或 LLM 执行环境，而不是模型本身

###  LM Studio 与 Ollama 有何不同？

| **特点/能力**              | **Ollama**                                        | **LM Studio**                                           |
|----------------------------|--------------------------------------------------|--------------------------------------------------------|
| **主要目的**               | 本地运行管理多个LLMs                              | 研究、实验、微调和培训 LLMs                            |
| **支持的模型**             | LLaMA, GPT-3, GPT-4, and other popular LLMs       | LLaMA, GPT, custom LLMs, and more, with a focus on fine-tuning |
| **本地模型执行**           | Supports running models locally without cloud dependencies | Allows for local execution, including training and experimentation |
| **模型微调、训练**         | No, typically runs pre-trained models             | Yes, built for fine-tuning LLMs on custom datasets     |
| **实验工具**               | 实验功能最少，更注重简单部署                      | 用于试验模型、数据集和超参数的大量工具                  |
| **易用性**                 | Simple, user-friendly interface for non-technical users | More advanced, with a steeper learning curve but richer in functionality for researchers |
| **硬件需求**               | 经过优化，可在本地 GPU 或 CPU 上运行              | Requires higher-end hardware (GPUs) for fine-tuning and training |
| **隐私**                   | Strong privacy due to local model execution       | Supports local execution for privacy, but also scales to cloud-based setups |
| **API 集成**               | Yes, offers APIs to integrate LLMs into custom applications | 功能测试中                                               |
| **Cloud Integration**      | Primarily local execution; not designed for cloud-based workflows | Supports both local and cloud-based training environments, useful for large-scale training |
| **Model Deployment**       | Can be deployed locally or integrated via API into applications | Typically used for experimentation, research, and training, with some deployment capabilities |
| **Pre-Trained Models**     | Easy access to pre-trained models (LLaMA, GPT, etc.) | Access to a variety of pre-trained models (hugging face and others), with emphasis on customization and fine-tuning |
| **Target Audience 目标受众** | Developers, non-technical users who want easy local LLM access | AI researchers, developers, engineers who require deeper control and experimentation |
| **Community & Support**    | Developer-focused community                       | Strong research community with contributions from AI developers |

### 参考链接
- [Exploring Ollama & LM Studio](https://dasarpai.com/dsblog/exploring-ollama)
- [Exploring AnythingLLM](https://dasarpai.com/dsblog/exploring-anythingllm)
