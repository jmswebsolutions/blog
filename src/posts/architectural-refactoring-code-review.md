---
title: "Architectural Refactoring: Practical Lessons from a Code Review"
slug: architectural-refactoring-code-review
category: "Architecture"
date: "2026-06-22T10:00:00"
readTime: "4 min"
tags: ["Architecture", "React", "TypeScript", "CodeReview", "Refactoring", "CleanCode", "Performance"]
excerpt: "Recently, I received detailed feedback on my AI & Tech Dashboard project, and it turned out to be one of the most valuable learning experiences so far."
image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=630&fit=crop"
---

🚀 Architectural Refactoring: Practical Lessons from a Code Review

Recently, I received detailed feedback on my AI & Tech Dashboard project, and it turned out to be one of the most valuable learning experiences so far.

Here are the key insights I took from it:

📁 Code Organization (Co-location done right)
Co-location is not just grouping files together randomly. It's about treating each component as a self-contained unit.

Each component should live with its related files (tsx, styles, tests, etc.).
This improves readability, navigation, and long-term maintainability.

⚡ Performance Matters
I hit a classic performance issue: sequential vs parallel API calls.

Refactoring a loop using await inside for...of into Promise.all for getCommentTree made a massive difference.

Small change → huge performance gain.

📚 Focused Documentation
Less is more.

I removed redundant documentation and focused only on what truly matters:
- Real system architecture (Presentation / Data layers)
- Project-specific diagrams instead of generic ones
- ADRs (Architecture Decision Records) for key decisions

🏗️ Architecture vs Folder Structure
One of the biggest mindset shifts:

Architecture is about logical layers, responsibilities, and dependency flow — not folder organization.

Types and constants are not architectural layers. They are implementation details.

🎯 Co-location of Types
Types represent the API data model, so they should live where they are used, not in a separate global folder.

This improves cohesion and reduces unnecessary abstraction.

💡 Key Takeaways
- Separation of concerns is essential
- Performance should be considered from the start, not after
- Documentation must be practical, not decorative
- Architecture is about abstractions, not folders
- Code reviews are extremely valuable — embrace feedback

🔗 [GitHub](https://github.com/jmswebsolutions/Project-AI-Tech-Dashboard)
🌐 [Live Demo](https://jmswebsolutions.com.br/Project-AI-Tech-Dashboard/)

#SoftwareEngineering #Architecture #React #TypeScript #CodeReview #Refactoring #CleanCode #Performance
