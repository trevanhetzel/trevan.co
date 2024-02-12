module Jekyll
  module TernaryFilters
    def if(value, true_output, untrue_output = '')
      value ? true_output : untrue_output
    end
 
    def unless(value, untrue_output, true_output = '')
      value ? true_output : untrue_output
    end
 
    def matches(value, matcher, true_output, untrue_output = '')
      value == matcher ? true_output : untrue_output
    end
 
    def default(value, default)
      value.nil? ? default : value
    end
  end
end
 
Liquid::Template.register_filter(Jekyll::TernaryFilters)