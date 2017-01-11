require "tomlrb"
require "json"
require "mustache"

require "rack-livereload"
use Rack::LiveReload

require "sass/plugin/rack"
use Sass::Plugin::Rack

use Rack::Static, urls: ["/stylesheets"], root: "public"

class App
  def call(env)
    content = render("resume.toml", "templates/resume.html.mustache")
    length = content.size

    [200, {Rack::CONTENT_TYPE => "text/html", Rack::CONTENT_LENGTH => length}, [content]]
  end

  def render(source, template)
    Mustache.template_file = template

    data = read_toml(source)
    view = Mustache.new

    data.each do |k, v|
      view[k.to_sym] = v
    end

    content = view.render
  end

  def read_toml(source)
    toml = File.read(source)
    Tomlrb.parse(toml)
  end
end

run App.new