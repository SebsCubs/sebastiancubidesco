#!/bin/bash

echo "🔍 Verifying Blog Setup..."
echo ""

# Check for required files
echo "📁 Checking required files..."
required_files=(
    "js/main.js"
    "js/state.js"
    "js/i18n.js"
    "js/contentManager.js"
    "js/components.js"
    "js/content-config.js"
    "css/styles.css"
    "index.html"
    "blogs.html"
    "projects.html"
    "content/index.md"
    "content/index_es.md"
)

missing_files=()
for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file"
    else
        echo "❌ $file (MISSING)"
        missing_files+=("$file")
    fi
done

echo ""

# Check for content files
echo "📝 Checking content files..."
content_files=(
    "content/blogs/post1.md"
    "content/blogs/post1_es.md"
    "content/blogs/post2.md"
    "content/blogs/post2_es.md"
)

for file in "${content_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file"
    else
        echo "⚠️  $file (Missing - will show in config but fail to load)"
    fi
done

echo ""

# Check for old files that should be removed
echo "🧹 Checking for old files..."
old_files=(
    "js/blog.js"
    "js/content.js"
    "js/header.js"
    "js/projects.js"
    "js/theme.js"
    "js/translation.js"
)

old_found=false
for file in "${old_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "⚠️  $file (OLD - should be removed)"
        old_found=true
    fi
done

if [[ "$old_found" == false ]]; then
    echo "✅ No old files found"
fi

echo ""

# Check backup
echo "💾 Checking backup..."
if [[ -d "js_backup_original" ]]; then
    echo "✅ Original files backed up in js_backup_original/"
else
    echo "⚠️  No backup found (js_backup_original/)"
fi

echo ""

# Summary
echo "📊 Summary:"
if [[ ${#missing_files[@]} -eq 0 ]]; then
    echo "✅ All required files present"
    echo "✅ Ready for testing!"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Run: ./start-dev.sh"
    echo "2. Open http://localhost:8000"
    echo "3. Test theme toggle, language switching, and navigation"
    echo "4. Check browser console for performance logs"
else
    echo "❌ Missing ${#missing_files[@]} required files:"
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
    echo ""
    echo "Please ensure all files are in place before testing."
fi

echo ""
echo "🔧 Debugging tips:"
echo "- Use browser dev tools console"
echo "- Check 'window.app' for state inspection"
echo "- Look for cache hit rate logs"
echo "- Verify ES6 module support in browser"